import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  const ok = await getSession();
  return NextResponse.json({ admin: ok });
}
