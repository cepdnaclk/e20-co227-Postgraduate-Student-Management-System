// utils/jwt-utils.ts
export function base64UrlDecode(base64Url: string): string {
  // Replace URL-safe characters with Base64 characters
  const base64 = base64Url
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  // Pad the base64 string with `=` to make its length a multiple of 4
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const base64Padded = base64 + padding;

  // Decode base64 string to a UTF-8 string
  return atob(base64Padded);
}

export function decodeJwt(token: string): any {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('JWT does not have 3 parts');
  }

  const payload = parts[1];

  // Decode the payload
  const decodedPayload = base64UrlDecode(payload);

  // Parse JSON
  return JSON.parse(decodedPayload);
}