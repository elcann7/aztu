@echo off
title Limit & Toreme Laboratoriyasi
cd /d "%~dp0math-lab"
start http://localhost:3000
node server.cjs
pause
