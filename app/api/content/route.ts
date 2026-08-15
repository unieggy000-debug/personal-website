import { NextResponse } from "next/server";
import { readEditableContent } from "@/lib/content/cms-io";

export async function GET() {
  const content = await readEditableContent();
  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
