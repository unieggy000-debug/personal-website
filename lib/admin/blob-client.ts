const BLOB_API = "https://blob.vercel-storage.com";

function blobAuthToken(): string | null {
  return process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_OIDC_TOKEN || null;
}

function blobAuthHeaders(contentType?: string): Record<string, string> {
  const token = blobAuthToken();
  if (!token) {
    throw new Error(
      "Vercel Blob 未配置。请在 Vercel 项目 Storage 中创建 Blob 并关联本项目。"
    );
  }

  const headers: Record<string, string> = {
    authorization: `Bearer ${token}`,
    "x-vercel-blob-access": "public",
    "x-add-random-suffix": "0",
  };

  if (contentType) {
    headers["content-type"] = contentType;
  }

  const storeId = process.env.BLOB_STORE_ID;
  if (storeId && process.env.VERCEL_OIDC_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN) {
    headers["x-vercel-blob-store-id"] = storeId;
  }

  return headers;
}

export function isBlobStorageAvailable(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL && process.env.VERCEL_OIDC_TOKEN)
  );
}

export async function readBlobText(pathname: string): Promise<string | null> {
  if (!isBlobStorageAvailable()) {
    return null;
  }

  const response = await fetch(`${BLOB_API}/${encodeURIComponent(pathname)}`, {
    headers: blobAuthHeaders(),
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      detail || `Blob read failed (${response.status} ${response.statusText})`
    );
  }

  return response.text();
}

export async function writeBlobText(
  pathname: string,
  body: string,
  contentType: string
): Promise<void> {
  const response = await fetch(`${BLOB_API}/${encodeURIComponent(pathname)}`, {
    method: "PUT",
    headers: blobAuthHeaders(contentType),
    body,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      detail || `Blob write failed (${response.status} ${response.statusText})`
    );
  }
}

export async function writeBlobBytes(
  pathname: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const response = await fetch(`${BLOB_API}/${encodeURIComponent(pathname)}`, {
    method: "PUT",
    headers: blobAuthHeaders(contentType),
    body: new Uint8Array(buffer),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      detail || `Blob write failed (${response.status} ${response.statusText})`
    );
  }

  const payload = (await response.json()) as { url?: string };
  if (!payload.url) {
    throw new Error("Blob write returned no URL");
  }
  return payload.url;
}
