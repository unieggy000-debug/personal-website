import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import {
  buildUploadName,
  persistUploadedImage,
} from "@/lib/admin/upload-storage";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "Missing file" }, { status: 400 });
  }

  const type = file.type || "application/octet-stream";
  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json(
      { ok: false, error: "Unsupported image type" },
      { status: 400 }
    );
  }

  try {
    const name = buildUploadName(type, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await persistUploadedImage(buffer, name, type);

    return NextResponse.json({ ok: true, url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload storage failed";
    console.error("[admin/upload]", error);

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
