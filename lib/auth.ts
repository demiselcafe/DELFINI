import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";
const PAYLOAD = "admin";

function getSecret(): string | null {
  return process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || null;
}

export function createSessionToken(): string {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD or ADMIN_SECRET must be set");
  const sig = crypto.createHmac("sha256", secret).update(PAYLOAD).digest("hex");
  return `${PAYLOAD}:${sig}`;
}

export function verifyToken(token: string): boolean {
  try {
    const secret = getSecret();
    if (!secret) return false;
    const [p, sig] = token.split(":");
    if (p !== PAYLOAD || !sig) return false;
    const expected = crypto.createHmac("sha256", secret).update(PAYLOAD).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function getSession(): Promise<boolean> {
  if (!getSecret()) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return !!token && verifyToken(token);
}

export function getCookieName() {
  return COOKIE_NAME;
}
