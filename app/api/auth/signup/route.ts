import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await getUserByEmail(email);
    } catch (error: any) {
      if (error.message?.includes('Database not configured')) {
        return NextResponse.json(
          { error: 'Database not configured. Please set DATABASE_URL in .env file' },
          { status: 503 }
        );
      }
      throw error;
    }
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user - only customers can sign up publicly
    // Other roles must be created by admin
    let user;
    try {
      user = await createUser(name, email, password, phone, 'seller');
    } catch (error: any) {
      if (error.message?.includes('Database not configured')) {
        return NextResponse.json(
          { error: 'Database not configured. Please set DATABASE_URL in .env file' },
          { status: 503 }
        );
      }
      throw error;
    }

    // Return user data without password
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
    console.error('Sign up error:', error);
    return NextResponse.json(
      { error: 'An error occurred during sign up' },
      { status: 500 }
    );
  }
}

