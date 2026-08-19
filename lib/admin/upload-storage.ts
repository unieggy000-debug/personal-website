import { randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { writeBlobBytes } from "@/lib/admin/blob-client";

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
    return writeBlobBytes(`uploads/${name}`, buffer, contentType);
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
