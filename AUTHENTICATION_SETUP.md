# Authentication Setup Guide

## ✅ What's Been Implemented

1. **Real Authentication System**
   - Password hashing with bcryptjs
   - Sign in API route (`/api/auth/signin`)
   - Sign up API route (`/api/auth/signup`)
   - Session management with cookies
   - User authentication hooks

2. **Database Schema Updated**
   - Password field is now required (not optional)
   - User model ready for authentication

3. **Admin User Setup**
   - Seed script created to create admin user
   - Email: `wj00083@gmail.com`
   - Default password: `admin123` (change after first login!)

4. **Updated Pages**
   - Sign in page now uses real authentication
   - Sign up page now creates real users
   - Navbar shows user info when logged in
   - Automatic redirect to dashboard based on role

## 🚀 Setup Steps

### Step 1: Update Database Connection

Make sure your `.env` file has the correct database URL:

```env
DATABASE_URL="postgresql://postgres:Mombasa%40254@localhost:5432/martials_auto_parts?connect_timeout=10&sslmode=prefer"
```

**Important:** Replace `%40` with `@` if needed, or use URL encoding.

### Step 2: Push Database Schema

```bash
npm run db:push
```

This will update your database schema to make the password field required.

### Step 3: Create Admin User

```bash
npm run db:seed
```

This will create the admin user:
- **Email:** `wj00083@gmail.com`
- **Password:** `admin123`
- **Role:** `admin`

**⚠️ IMPORTANT:** Change the password after first login!

### Step 4: Start the Development Server

```bash
npm run dev
```

## 📝 How It Works

### Sign Up Flow
1. User fills out sign up form
2. Form validates input
3. API call to `/api/auth/signup`
4. Password is hashed with bcrypt
5. User is created in database
6. Session is created
7. User is redirected to dashboard (if role allows) or home page

### Sign In Flow
1. User enters email and password
2. API call to `/api/auth/signin`
3. Password is verified against hashed password
4. If valid, session is created
5. User is redirected to dashboard (if role allows) or home page

### Session Management
- Sessions are stored in HTTP-only cookies
- Sessions last 7 days
- User info is available via `/api/auth/session`
- Use `useAuth()` hook in components to get current user

## 🔐 Security Features

- ✅ Passwords are hashed with bcrypt (12 rounds)
- ✅ HTTP-only cookies prevent XSS attacks
- ✅ Secure cookies in production
- ✅ Password validation (minimum 6 characters)
- ✅ Email validation
- ✅ Duplicate email prevention

## 👤 User Roles

- **admin** - Full access to all dashboards and user management
- **owner** - Business overview and analytics
- **manager** - Inventory management
- **seller** - Sales management

## 🧪 Testing

### Test Admin Login
1. Go to `/auth/signin`
2. Email: `wj00083@gmail.com`
3. Password: `admin123`
4. Should redirect to `/dashboard/admin`

### Test Sign Up
1. Go to `/auth/signup`
2. Fill out the form
3. New user will be created with role `seller`
4. Should redirect to `/dashboard/seller`

## 🔧 Troubleshooting

### Database Connection Error
- Make sure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify port 5432 is correct
- Check if database `martials_auto_parts` exists

### Password Not Working
- Make sure you ran `npm run db:seed` to create admin user
- Check if password was hashed correctly
- Try resetting password in database

### Session Not Working
- Check browser console for errors
- Verify cookies are enabled
- Check if API routes are accessible

## 📚 API Endpoints

### POST `/api/auth/signin`
Sign in with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "admin"
  }
}
```

### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

### GET `/api/auth/session`
Get current user session.

**Response:**
```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "admin"
  }
}
```

### DELETE `/api/auth/session`
Sign out current user.

## 🎯 Next Steps

1. Add password reset functionality
2. Add email verification
3. Add two-factor authentication (optional)
4. Add rate limiting for login attempts
5. Add password strength requirements
6. Add account lockout after failed attempts

