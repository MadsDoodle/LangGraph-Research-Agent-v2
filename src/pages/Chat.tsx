import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ToolActivity } from "@/components/ToolActivity";
import { Sparkles, Search, Database, FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiService, type StreamEvent } from "@/services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

interface ToolActivityState {
  name: string;
  status: string;
  icon: typeof Search;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [papersFound, setPapersFound] = useState<string[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolActivityState | null>(null);
  const [healthStatus, setHealthStatus] = useState<string>("unknown");
  const [sessionCreatedAt, setSessionCreatedAt] = useState<string>("");
  const { toast } = useToast();

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const health = await apiService.checkHealth();
      setHealthStatus(health.status);
    } catch (error) {
      console.error("Backend health check failed:", error);
      setHealthStatus("offline");
      toast({
        title: "Backend Offline",
        description: "Please ensure the backend server is running on port 8000",
        variant: "destructive",
      });
    }
  };

  const initializeSession = async () => {
    try {
      const session = await apiService.createSession();
      setSessionId(session.session_id);
      setThreadId(session.thread_id);
      setSessionCreatedAt(new Date(session.created_at).toLocaleString());
      
      // Add welcome message
      setMessages([{
        role: "assistant",
        content: "Welcome to your AI Research Assistant! 👋\n\nI can help you:\n• 🔍 Search across multiple academic databases (arXiv, PubMed, Semantic Scholar, CrossRef)\n• 📥 Download and analyze research papers\n• 📊 Identify research gaps and opportunities\n• 📄 Generate publication-ready LaTeX documents\n\nTell me what research topic interests you!",
        timestamp: new Date().toLocaleTimeString()
      }]);

      toast({
        title: "Session Created",
        description: `Session ID: ${session.session_id.slice(0, 8)}...`,
      });
    } catch (error) {
      console.error("Failed to create session:", error);
      toast({
        title: "Error",
        description: "Failed to create research session. Please check backend connection.",
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!sessionId) {
      toast({
        title: "No Session",
        description: "Please wait for session initialization",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Use streaming for real-time updates
      let currentResponse = "";
      const newToolsUsed: string[] = [];

      await apiService.streamMessage(sessionId, content, (event: StreamEvent) => {
        switch (event.type) {
          case 'tool':
            if (event.tool_name) {
              // Map tool names to user-friendly names and icons
              const toolInfo = getToolInfo(event.tool_name);
              setActiveTool({
                name: toolInfo.name,
                status: toolInfo.status,
                icon: toolInfo.icon
              });
              newToolsUsed.push(event.tool_name);
            }
            break;

          case 'message':
            if (event.content) {
              currentResponse = event.content;
              // Update the assistant message in real-time
              setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.role === 'assistant') {
                  return [...prev.slice(0, -1), {
                    ...lastMsg,
                    content: event.content!,
                  }];
                } else {
                  return [...prev, {
                    role: 'assistant',
                    content: event.content!,
                    timestamp: new Date().toLocaleTimeString()
                  }];
                }
              });
            }
            break;

          case 'pdf':
            if (event.pdf_path) {
              setPdfPath(event.pdf_path);
              toast({
                title: "PDF Generated! 📄",
                description: "Your research paper is ready for download",
              });
            }
            break;

          case 'done':
            setActiveTool(null);
            setIsLoading(false);
            // Update tools used
            setToolsUsed(prev => [...new Set([...prev, ...newToolsUsed])]);
            break;

          case 'error':
            console.error('Stream error:', event.message);
            toast({
              title: "Error",
              description: event.message || "An error occurred",
              variant: "destructive",
            });
            setActiveTool(null);
            setIsLoading(false);
            break;
        }
      });

    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      setActiveTool(null);
    }
  };

  const getToolInfo = (toolName: string): { name: string; status: string; icon: typeof Search } => {
    const toolMap: Record<string, { name: string; status: string; icon: typeof Search }> = {
      'arxiv_search': { name: 'arXiv Search', status: 'Searching arXiv database...', icon: Search },
      'pubmed_search': { name: 'PubMed Search', status: 'Searching PubMed database...', icon: Database },
      'semantic_scholar_search': { name: 'Semantic Scholar', status: 'Searching Semantic Scholar...', icon: Database },
      'crossref_search': { name: 'CrossRef Search', status: 'Searching CrossRef database...', icon: Database },
      'multi_database_search': { name: 'Multi-Database Search', status: 'Searching all databases...', icon: Sparkles },
      'download_papers_from_search': { name: 'Download Papers', status: 'Downloading research papers...', icon: Download },
      'read_pdf': { name: 'Read PDF', status: 'Extracting text from PDF...', icon: FileText },
      'read_pdf_with_metadata': { name: 'Analyze PDF', status: 'Analyzing PDF metadata...', icon: FileText },
      'render_latex_pdf': { name: 'Generate PDF', status: 'Compiling LaTeX to PDF...', icon: FileText },
    };

    return toolMap[toolName] || { name: toolName, status: `Using ${toolName}...`, icon: Search };
  };

  const handleQuickAction = async (action: string) => {
    if (!sessionId) {
      toast({
        title: "No Session",
        description: "Please wait for session initialization",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const actionType = action === 'write_paper' ? 'write_paper' : 'search_all';
      const response = await apiService.executeQuickAction(sessionId, actionType);
      
      // Add assistant response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        timestamp: new Date().toLocaleTimeString()
      }]);

      // Update state
      setToolsUsed(prev => [...new Set([...prev, ...response.tools_used])]);
      setPapersFound(prev => [...new Set([...prev, ...response.papers_found])]);
      if (response.pdf_path) {
        setPdfPath(response.pdf_path);
      }

      toast({
        title: "Quick Action Complete",
        description: `${action === 'write_paper' ? 'Paper generation' : 'Database search'} completed`,
      });
    } catch (error) {
      console.error("Quick action failed:", error);
      toast({
        title: "Error",
        description: "Failed to execute quick action",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSession = async () => {
    // Delete old session if exists
    if (sessionId) {
      try {
        await apiService.deleteSession(sessionId);
      } catch (error) {
        console.error("Failed to delete old session:", error);
      }
    }

    // Reset state
    setMessages([]);
    setToolsUsed([]);
    setPapersFound([]);
    setPdfPath(null);
    setActiveTool(null);

    // Create new session
    await initializeSession();
  };

  const handleDownloadPdf = () => {
    if (sessionId && pdfPath) {
      const url = apiService.getPdfUrl(sessionId);
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated Background */}
      <div className="animated-grid-bg">
        <div className="grid-overlay" />
      </div>
      
      {/* Navbar */}
      <Navbar 
        sessionActive={!!sessionId} 
        healthStatus={healthStatus}
        onNewSession={handleNewSession}
      />
      
      {/* Main Layout */}
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <Sidebar
          sessionId={sessionId || 'Initializing...'}
          createdAt={sessionCreatedAt || 'Initializing...'}
          toolsUsed={toolsUsed}
          papersFound={papersFound}
          pdfGenerated={!!pdfPath}
          onQuickAction={handleQuickAction}
          onDownloadPdf={pdfPath ? handleDownloadPdf : undefined}
        />
        
        {/* Chat Area */}
        <main className="flex-1 ml-80 mb-32 relative">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Messages */}
            <div className="space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} {...message} />
              ))}
            </div>

            {/* Tool Activity Indicator */}
            {activeTool && (
              <div className="mt-6">
                <ToolActivity
                  toolName={activeTool.name}
                  icon={activeTool.icon}
                  status={activeTool.status}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Chat Input */}
      <ChatInput 
        onSend={handleSendMessage}
        disabled={!sessionId || isLoading}
        isLoading={isLoading}
      />
    </div>
  );
}
