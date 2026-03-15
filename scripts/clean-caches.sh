#!/bin/sh

echo "Cleaning caches..."

if command -v trash >/dev/null 2>&1; then
  REMOVE="trash"
else
  REMOVE="rm -rf"
fi

$REMOVE tsconfig.tsbuildinfo 2>/dev/null
$REMOVE .next/cache/ 2>/dev/null
$REMOVE .eslintcache 2>/dev/null

echo "Caches cleaned."
