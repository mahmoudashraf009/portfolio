@echo off
echo ============================================
echo Updating Mahmoud Ashraf's Portfolio Website
echo ============================================
echo.

echo Staging all changes...
git add .

echo Committing changes...
git commit -m "Update portfolio content"

echo Uploading to GitHub...
git push

echo.
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Portfolio updated successfully!
    echo Your live website will refresh in 1-2 minutes.
) else (
    echo [ERROR] Update failed. Please check your internet connection or Git status.
)
echo.
pause
