#!/bin/bash

echo "🚀 Starting Research AI Backend Server..."
echo "📍 Location: research/"
echo "🔌 Port: 8000"
echo ""

cd research

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found in research/ directory"
    echo "Please create a .env file with your OPENAI_API_KEY"
    echo ""
    echo "Example:"
    echo "OPENAI_API_KEY=your_key_here"
    echo ""
    read -p "Press Enter to continue anyway or Ctrl+C to exit..."
fi

# Check if virtual environment exists
if [ -d "env" ]; then
    echo "🐍 Activating virtual environment..."
    source env/bin/activate
fi

# Check if dependencies are installed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

echo ""
echo "✅ Starting FastAPI server..."
echo "📖 API Docs: http://localhost:8000/docs"
echo "🏥 Health Check: http://localhost:8000/health"
echo ""

python api.py
