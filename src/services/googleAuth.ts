export interface GoogleUserPayload {
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  sub: string;
}

export function parseGoogleJwt(token: string): GoogleUserPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to parse Google JWT:', err);
    return null;
  }
}

// User's official Google OAuth Client ID
export const GOOGLE_CLIENT_ID =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string) ||
  '1094028904596-62m7kvd52j3ajbvhn6pl25lord2tqo74.apps.googleusercontent.com';
