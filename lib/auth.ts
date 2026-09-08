const TOKEN_KEY = "qlf_token";
const ROLE_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export interface DecodedToken {
  sub: string;
  email: string;
  exp: number;
  [key: string]: unknown; // allows reading the long URI-keyed claim below
}

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch {
    return null;
  }
}

export function isTokenExpired(decoded: DecodedToken): boolean {
  return decoded.exp * 1000 < Date.now();
}

export function getRoles(decoded: DecodedToken): string[] {
  const raw = decoded[ROLE_CLAIM] ?? decoded.role;
  if (!raw) return [];
  return Array.isArray(raw) ? (raw as string[]) : [raw as string];
}