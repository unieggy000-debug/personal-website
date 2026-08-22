import { head, put } from "@vercel/blob";

const BLOB_CONTENT_PREFIX = "cms/";

function envEntries(): [string, string | undefined][] {
  return Object.entries(process.env);
}

/** Vercel may inject a custom prefix when connecting a Blob store. */
export function resolveBlobReadWriteToken(): string | undefined {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_READ_WRITE_TOKEN;
  }

  for (const [key, value] of envEntries()) {
    if (key.endsWith("_BLOB_READ_WRITE_TOKEN") && value) {
      return value;
    }
  }

  return undefined;
}

export function resolveBlobStoreId(): string | undefined {
  if (process.env.BLOB_STORE_ID) {
    return process.env.BLOB_STORE_ID;
  }

  for (const [key, value] of envEntries()) {
    if (key.endsWith("_BLOB_STORE_ID") && value) {
      return value;
    }
  }

  return undefined;
}

export function isBlobStorageAvailable(): boolean {
  if (resolveBlobReadWriteToken()) {
    return true;
  }

  // On Vercel, connected stores can authenticate with OIDC + store id at runtime.
  return Boolean(process.env.VERCEL && resolveBlobStoreId());
}

function blobNotConfiguredError() {
  return new Error(
    "Vercel Blob 未配置。请在 Vercel 项目 carol → Storage 中创建 Public Blob，并关联 Production / Preview / Development 后重新部署。"
  );
}

function putOptions(contentType: string) {
  const token = resolveBlobReadWriteToken();
  return {
    access: "public" as const,
    contentType,
    addRandomSuffix: false,
    allowOverwrite: true,
    ...(token ? { token } : {}),
  };
}

export async function readBlobText(pathname: string): Promise<string | null> {
  if (!isBlobStorageAvailable()) {
    return null;
  }

  try {
    const token = resolveBlobReadWriteToken();
    const meta = await head(pathname, token ? { token } : undefined);
    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Blob fetch failed (${response.status})`);
    }
    return response.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/not found|404|does not exist/i.test(message)) {
      return null;
    }
    throw error;
  }
}

export async function writeBlobText(
  pathname: string,
  body: string,
  contentType: string
): Promise<void> {
  if (!isBlobStorageAvailable()) {
    throw blobNotConfiguredError();
  }

  await put(pathname, body, putOptions(contentType));
}

export async function writeBlobBytes(
  pathname: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  if (!isBlobStorageAvailable()) {
    throw blobNotConfiguredError();
  }

  const blob = await put(pathname, buffer, putOptions(contentType));
  return blob.url;
}

export { BLOB_CONTENT_PREFIX };
