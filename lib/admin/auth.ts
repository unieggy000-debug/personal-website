import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/** Server-only — never import this module into client components. */
export const ADMIN_PASSWORD = "20040109mtA!";

export const ADMIN_COOKIE = "admin_session";

const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "personal-website-admin-hmac-v1";

function hmac(value: string): string {
  return createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string): boolean {
  return safeEqual(password, ADMIN_PASSWORD);
}

/** Signed session token: `token.signature` */
export function createSessionToken(): string {
  const token = randomBytes(24).toString("hex");
  return `${token}.${hmac(token)}`;
}

export function verifySessionToken(raw: string | undefined | null): boolean {
  if (!raw) {
    return false;
  }
  const [token, signature] = raw.split(".");
  if (!token || !signature) {
    return false;
  }
  return safeEqual(signature, hmac(token));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 7) {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
