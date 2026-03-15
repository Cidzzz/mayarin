#!/usr/bin/env bash
# Auto-rebuild & restart kado-ai when PM2 detects file changes
set -e
cd /root/Mayar/kado-ai
echo "[$(date)] Rebuilding kado-ai..."
npx vite build --logLevel error
echo "[$(date)] Build done. Starting server on port ${PORT:-3030}"
exec node server.js
