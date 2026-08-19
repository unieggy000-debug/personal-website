import { promises as fs } from "fs";
import path from "path";
import {
  isBlobStorageAvailable,
  readBlobText,
  writeBlobText,
} from "@/lib/admin/blob-client";
import type { EditableContent } from "./cms-types";
import {
  getDefaultEditableContent,
  resolveSitePayload,
  type ResolvedSitePayload,
} from "./editable-defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "cms-content.json");
const BLOB_CONTENT_PATH = "cms/cms-content.json";

export function getContentFilePath() {
  return CONTENT_FILE;
}

async function readLocalContent(): Promise<EditableContent | null> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    return JSON.parse(raw) as EditableContent;
  } catch {
    return null;
  }
}

async function writeLocalContent(content: EditableContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function readEditableContent(): Promise<EditableContent> {
  if (isBlobStorageAvailable()) {
    try {
      const raw = await readBlobText(BLOB_CONTENT_PATH);
      if (raw) {
        return JSON.parse(raw) as EditableContent;
      }
    } catch (error) {
      console.error("[cms-io] blob read failed:", error);
    }
  }

  const local = await readLocalContent();
  if (local) {
    return local;
  }

  return getDefaultEditableContent();
}

export async function writeEditableContent(
  content: EditableContent
): Promise<void> {
  const payload = JSON.stringify(content, null, 2);

  if (isBlobStorageAvailable()) {
    await writeBlobText(BLOB_CONTENT_PATH, payload, "application/json");
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "Vercel Blob 未配置，无法保存内容。请在 Vercel 项目 Storage 中创建 Blob 并关联本项目。"
    );
  }

  await writeLocalContent(content);
}

export async function loadResolvedSite(): Promise<ResolvedSitePayload> {
  const editable = await readEditableContent();
  return resolveSitePayload(editable);
}
