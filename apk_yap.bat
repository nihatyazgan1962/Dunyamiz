@echo off
color 0A
title DUNYAMIZ APK Olusturucu
echo ========================================================
echo   DUNYAMIZ APK Olusturucu Baslatiliyor...
echo ========================================================
powershell -ExecutionPolicy Bypass -File "%~dp0apk_yap.ps1"
