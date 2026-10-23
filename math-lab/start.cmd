@echo off
title Limit & Toreme Interaktiv Laboratoriyasi
cd /d "%~dp0"
echo =========================================================
echo   LIMIT & TOREME INTERAKTIV LABORATORIYASI (AzTU 6326A2)
echo =========================================================
echo Server ise salinir...
start http://localhost:3000
node server.cjs
pause
