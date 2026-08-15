import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import type { EditableContent } from "@/lib/content/cms-types";
import { readEditableContent, writeEditableContent } from "@/lib/content/cms-io";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const content = await readEditableContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: EditableContent;
  try {
    body = (await request.json()) as EditableContent;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.config || !body?.hero || !body?.about || !body?.works || !body?.credits) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  await writeEditableContent(body);
  return NextResponse.json({ ok: true });
}
