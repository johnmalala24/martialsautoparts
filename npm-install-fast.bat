@echo off
echo Optimizing npm install...

REM Clean npm cache
echo Cleaning npm cache...
npm cache clean --force

REM Set registry to faster mirror (optional - uncomment if needed)
REM npm config set registry https://registry.npmjs.org/

REM Install with optimizations
echo Installing dependencies with optimizations...
npm install --prefer-offline --no-audit --legacy-peer-deps --verbose

echo.
echo Installation complete!

