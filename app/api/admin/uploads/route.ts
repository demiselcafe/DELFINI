import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getSession } from "@/lib/auth";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = /^image\/(jpeg|png|gif|webp)$/;

async function requireAdmin() {
  const ok = await getSession();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return NextResponse.json({ files: [] });
    }
    const names = fs.readdirSync(UPLOADS_DIR).filter((n) => /\.(jpg|jpeg|png|gif|webp)$/i.test(n));
    const files = names.map((name) => ({
      name,
      url: `/uploads/${name}`,
    }));
    return NextResponse.json({ files });
  } catch (e) {
    return NextResponse.json({ error: "Failed to list" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const err = await requireAdmin();
  if (err) return err;
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.test(file.type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }
    const ext = path.extname(file.name) || ".jpg";
    const base = path.basename(file.name, ext).replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-_]/g, "") || "image";
    const name = `${base}-${Date.now()}${ext}`;
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    const dest = path.join(UPLOADS_DIR, name);
    const buf = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(dest, buf);
    return NextResponse.json({ url: `/uploads/${name}`, name });
  } catch (e) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
