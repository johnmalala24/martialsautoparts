import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user;
    try {
      user = await authenticateUser(email, password);
    } catch (error: any) {
      if (error.message?.includes('Database not configured')) {
        return NextResponse.json(
          { error: 'Database not configured. Please set DATABASE_URL in .env file' },
          { status: 503 }
        );
      }
      throw error;
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is inactive. Please contact administrator.' },
        { status: 403 }
      );
    }

    // Return user data (password is already excluded)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'An error occurred during sign in' },
      { status: 500 }
    );
  }
}

