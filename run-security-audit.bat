@echo off
REM ==============================================
REM Script d'audit de sécurité automatisé
REM Pour Windows
REM ==============================================

echo.
echo ========================================
echo   AUDIT DE SECURITE - TodoList App
echo ========================================
echo.

REM Vérifier npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] npm n'est pas installé ou pas dans le PATH
    pause
    exit /b 1
)

echo [1/5] Analyse des vulnerabilites npm...
echo ----------------------------------------
npm audit
echo.

echo [2/5] Tentative de correction automatique...
echo ----------------------------------------
npm audit fix
echo.

echo [3/5] Liste des dependances obsoletes...
echo ----------------------------------------
npm outdated
echo.

echo [4/5] Verification de la license des dependances...
echo ----------------------------------------
npx license-checker --summary
echo.

echo [5/5] Analyse de la taille du bundle...
echo ----------------------------------------
npx bundle-size
echo.

echo ========================================
echo   AUDIT TERMINE
echo ========================================
echo.
echo Consultez SECURITY_AUDIT.md pour les recommandations
echo.
pause