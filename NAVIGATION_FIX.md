# Navigation Fix Guide

## Issue: Pages Not Loading / Navigation Not Working

If you're experiencing issues where:
- Sign up page is blank
- Can't navigate from home screen
- Other pages don't load

## Quick Fixes:

### 1. Clear Browser Cache
- Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
- Clear cached images and files
- Or use Incognito/Private window

### 2. Hard Refresh
- Press `Ctrl + Shift + R` (Windows/Linux)
- Press `Cmd + Shift + R` (Mac)
- This forces browser to reload all files

### 3. Check Browser Console
- Press `F12` to open DevTools
- Go to **Console** tab
- Look for red error messages
- Share any errors you see

### 4. Verify Server is Running
- Check terminal for "Ready" message
- Should see: `✓ Ready in X.Xs`
- URL should be: `http://localhost:3000`

### 5. Test Direct URLs
Try accessing these URLs directly:
- http://localhost:3000 (Home)
- http://localhost:3000/auth/signup (Sign Up)
- http://localhost:3000/auth/signin (Sign In)
- http://localhost:3000/shop (Shop)
- http://localhost:3000/about (About)
- http://localhost:3000/contact (Contact)
- http://localhost:3000/test (Test Page)

### 6. Restart Dev Server
```bash
# Stop server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

## Common Issues:

### Issue: Blank Page on Navigation
**Possible Causes:**
- JavaScript error preventing render
- Missing component import
- CSS not loading

**Solution:**
1. Check browser console (F12)
2. Look for import errors
3. Verify all components exist

### Issue: Links Not Working
**Possible Causes:**
- Client-side routing disabled
- JavaScript errors
- Next.js router issue

**Solution:**
1. Check if using `<Link>` from `next/link`
2. Verify no JavaScript errors in console
3. Try direct URL navigation

### Issue: Page Loads But Shows Nothing
**Possible Causes:**
- Component render error
- CSS hiding content
- Missing data

**Solution:**
1. Check browser console for errors
2. Inspect page elements (F12 → Elements)
3. Verify CSS is loading

## Still Not Working?

1. **Check terminal output** - Look for build/compile errors
2. **Browser console** - Check for runtime errors
3. **Network tab** - Verify files are loading (F12 → Network)
4. **Try different browser** - Rule out browser-specific issues

## Verify All Pages Exist:

All these pages should be accessible:
- ✅ `/` - Home page
- ✅ `/auth/signup` - Sign up page
- ✅ `/auth/signin` - Sign in page
- ✅ `/shop` - Shop page
- ✅ `/shop/[slug]` - Product detail pages
- ✅ `/about` - About page
- ✅ `/contact` - Contact page
- ✅ `/dashboard/[role]` - Dashboard pages
- ✅ `/test` - Test page

If a specific page doesn't work, check the browser console for that page's errors.

