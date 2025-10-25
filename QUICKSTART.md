# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Set Up Environment Variables

Create a `.env` file in the `research/` directory:
```bash
cd research
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
cd ..
```

### Step 2: Start the Backend Server

Open a new terminal and run:
```bash
./start-backend.sh
```

The backend will be available at `http://localhost:8000`

### Step 3: Start the Frontend

Open another terminal and run:
```bash
./start-frontend.sh
```

The frontend will be available at `http://localhost:8080`

## 🎯 Access the Application

Open your browser and navigate to:
- **Chat Interface**: http://localhost:8080/chat
- **Landing Page**: http://localhost:8080
- **Backend API Docs**: http://localhost:8000/docs

## 💡 Usage Tips

### Starting a Research Session
1. Go to http://localhost:8080/chat
2. The system will automatically create a new session
3. Start chatting about your research topic

### Example Queries
- "Search for recent papers on quantum computing"
- "Find papers about machine learning in healthcare"
- "Download papers on neural networks and analyze them"
- "Write a research paper on transformer architectures"

### Quick Actions (Sidebar)
- **Search All Databases**: Searches arXiv, PubMed, Semantic Scholar, and CrossRef
- **Write Research Paper**: Generates a complete LaTeX research paper with citations
- **Start New Session**: Creates a fresh research session

### Tool Activity
Watch the real-time tool activity indicators to see:
- Which databases are being searched
- When papers are being downloaded
- PDF generation progress

### Download PDFs
Once a research paper is generated:
1. Look for the "PDF Generated" section in the sidebar
2. Click "Download PDF" to get your publication-ready document

## 🛠️ Troubleshooting

### Backend won't start
- Make sure you have Python 3.8+ installed
- Verify your OpenAI API key is valid
- Check that port 8000 is available

### Frontend won't start
- Make sure you have Node.js 16+ installed
- Run `npm install` if dependencies are missing
- Check that port 8080 is available

### Can't connect to backend
- Ensure the backend server is running (check Terminal 1)
- Verify it's running on port 8000
- Check browser console for errors

## 📚 Available Research Tools

The AI agent has access to:
- **arXiv**: Physics, Math, CS, and more
- **PubMed**: Biomedical and life sciences
- **Semantic Scholar**: AI/CS with citation counts
- **CrossRef**: Published papers across publishers
- **PDF Tools**: Download and analyze papers
- **LaTeX Generator**: Create publication-ready documents

## 🎓 Example Workflow

1. **Start conversation**: "I want to research transformer models in NLP"
2. **Agent searches**: Automatically searches multiple databases
3. **Review results**: Agent presents relevant papers
4. **Deep dive**: "Download and analyze the top 3 papers"
5. **Generate paper**: "Write a research paper based on these findings"
6. **Download**: Get your PDF from the sidebar

## 📝 Notes

- Sessions are stored in memory (will be lost on server restart)
- PDFs are saved in `research/output/` directory
- Downloaded papers are in `research/downloaded_papers/`
- Check terminal logs for detailed activity

---

For detailed documentation, see [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
