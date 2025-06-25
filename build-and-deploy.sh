#!/bin/bash

# Step 1: Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build

# Step 2: Copy to backend
echo "📂 Copying dist to backend..."
rm -rf ../backend/dist
cp -r dist ../backend/

# Step 3: Prepare backend
echo "🛠️ Installing backend dependencies..."
cd ../backend
npm install

echo "✅ Ready to deploy! Commit and push your changes now."
