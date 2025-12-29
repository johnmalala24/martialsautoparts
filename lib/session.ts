// Simple session management using cookies
// In production, consider using NextAuth.js or a more robust solution

import { cookies } from 'next/headers';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'admin' | 'owner' | 'manager' | 'seller';
}

const SESSION_COOKIE_NAME = 'martials_session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(user: SessionUser) {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify(user);
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    
    if (!sessionCookie?.value) {
      return null;
    }

    return JSON.parse(sessionCookie.value) as SessionUser;
  } catch (error) {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

