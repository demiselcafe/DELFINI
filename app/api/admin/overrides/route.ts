import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getOverrides, setOverrides, type AdminOverrides } from "@/lib/adminOverrides";

async function requireAdmin() {
  const ok = await getSession();
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const err = await requireAdmin();
  if (err) return err;
  const data = getOverrides();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const err = await requireAdmin();
  if (err) return err;
  try {
    const body = (await request.json()) as Partial<AdminOverrides>;
    const data = setOverrides(body);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}
