import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export function extensionForType(type: string, filename: string) {
  if (EXT_BY_TYPE[type]) {
    return EXT_BY_TYPE[type];
  }
  const fromName = filename.split(".").pop()?.toLowerCase();
  if (fromName && /^[a-z0-9]{2,5}$/.test(fromName)) {
    return fromName;
  }
  return "bin";
}

export function buildUploadName(type: string, filename: string) {
  const ext = extensionForType(type, filename);
  return `${Date.now()}-${randomBytes(6).toString("hex")}.${ext}`;
}

async function uploadToVercelBlob(
  buffer: Buffer,
  pathname: string,
  contentType: string
): Promise<string> {
  const token =
    process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN;
  if (!token) {
    throw new Error(
      "Vercel Blob 未配置。请在 Vercel 项目 Storage 中创建 Blob 并关联本项目。"
    );
  }

  const headers: Record<string, string> = {
    authorization: `Bearer ${token}`,
    "content-type": contentType || "application/octet-stream",
    "x-vercel-blob-access": "public",
    "x-add-random-suffix": "0",
  };

  const storeId = process.env.BLOB_STORE_ID;
  if (storeId && process.env.VERCEL_OIDC_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN) {
    headers["x-vercel-blob-store-id"] = storeId;
  }

  const response = await fetch(
    `https://blob.vercel-storage.com/${encodeURIComponent(pathname)}`,
    {
      method: "PUT",
      headers,
      body: new Uint8Array(buffer),
    }
  );

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      detail || `Blob upload failed (${response.status} ${response.statusText})`
    );
  }

  const payload = (await response.json()) as { url?: string };
  if (!payload.url) {
    throw new Error("Blob upload returned no URL");
  }
  return payload.url;
}

/** Local disk in dev; Vercel Blob in production when credentials are present. */
export async function persistUploadedImage(
  buffer: Buffer,
  name: string,
  contentType: string
): Promise<string> {
  if (
    process.env.BLOB_READ_WRITE_TOKEN ||
    (process.env.VERCEL && process.env.VERCEL_OIDC_TOKEN)
  ) {
    return uploadToVercelBlob(buffer, `uploads/${name}`, contentType);
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Vercel Blob 未配置。请在 Vercel 项目 Storage 中创建 Blob 并关联本项目。"
    );
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  await fs.writeFile(path.join(uploadsDir, name), buffer);
  return `/uploads/${name}`;
}
