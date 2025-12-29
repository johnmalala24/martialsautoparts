# Troubleshooting Blank Screen

## Quick Fixes

### 1. Check Browser Console
- Press **F12** to open DevTools
- Go to **Console** tab
- Look for red error messages
- Share any errors you see

### 2. Verify Server is Running
- Check terminal for "Ready" message
- Should see: `✓ Ready in X.Xs`
- URL should be: `http://localhost:3000`

### 3. Hard Refresh
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`
- This clears cached files

### 4. Check Port
- Make sure nothing else is using port 3000
- Try: `http://localhost:3000` (not 3001 or other ports)

### 5. Restart Dev Server
```bash
# Stop server (Ctrl+C)
# Then restart:
npm run dev
```

## Common Issues

### Issue: Blank White Screen
**Solution**: 
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify CSS is loading
4. Try incognito/private window

### Issue: Server Not Starting
**Solution**:
```bash
# Kill all node processes
Get-Process -Name node | Stop-Process -Force

# Clear .next folder
Remove-Item -Recurse -Force .next

# Reinstall dependencies
npm install

# Start fresh
npm run dev
```

### Issue: CSS Not Loading
**Solution**:
- Check if `app/globals.css` exists
- Verify Tailwind is configured
- Hard refresh browser

### Issue: Component Errors
**Solution**:
- Check browser console for specific component errors
- Verify all imports are correct
- Check if mock data is loading

## Still Not Working?

1. **Check terminal output** - Look for error messages
2. **Browser console** - Check for runtime errors
3. **Network tab** - Verify files are loading (F12 → Network)
4. **Try different browser** - Rule out browser-specific issues

## Verify Setup

Run these commands to verify everything is set up:

```bash
# Check Node version (should be 20+)
node --version

# Check npm version
npm --version

# Verify dependencies
npm list --depth=0

# Test build
npm run build
```

If build succeeds but preview is blank, it's likely a runtime issue. Check the browser console for specific errors.

