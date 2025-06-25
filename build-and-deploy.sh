#!/bin/bash

echo "📦 Building frontend..."
cd frontend || exit 1
npm install
npm run build || exit 1

echo "📂 Copying dist to backend..."
rm -rf ../backend/dist
cp -r dist ../backend/ || exit 1

echo "🛠️ Installing backend dependencies..."
cd ../backend
npm install

echo "✅ Ready to deploy! Commit and push your changes now."

