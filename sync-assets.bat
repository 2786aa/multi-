@echo off
echo ========================================================
echo   Syncing Web Files to Android Assets Folder...
echo ========================================================
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"
copy /Y "index.html" "android\app\src\main\assets\index.html"
copy /Y "style.css" "android\app\src\main\assets\style.css"
copy /Y "app.js" "android\app\src\main\assets\app.js"
echo.
echo [DONE] Files successfully synced to android/app/src/main/assets/
pause
