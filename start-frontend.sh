#!/bin/bash

echo "🚀 Starting Research AI Frontend..."
echo "🔌 Port: 8080"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "ℹ️  Creating .env file from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
    fi
fi

echo ""
echo "✅ Starting Vite dev server..."
echo "🌐 Frontend: http://localhost:8080"
echo "💬 Chat Interface: http://localhost:8080/chat"
echo ""

npm run dev
