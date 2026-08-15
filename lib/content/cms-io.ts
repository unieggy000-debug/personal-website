import { promises as fs } from "fs";
import path from "path";
import type { EditableContent } from "./cms-types";
import {
  getDefaultEditableContent,
  resolveSitePayload,
  type ResolvedSitePayload,
} from "./editable-defaults";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "cms-content.json");

export function getContentFilePath() {
  return CONTENT_FILE;
}

export async function readEditableContent(): Promise<EditableContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as EditableContent;
    return parsed;
  } catch {
    return getDefaultEditableContent();
  }
}

export async function writeEditableContent(
  content: EditableContent
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf8");
}

export async function loadResolvedSite(): Promise<ResolvedSitePayload> {
  const editable = await readEditableContent();
  return resolveSitePayload(editable);
}
