import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { ToolActivity } from "@/components/ToolActivity";
import { Sparkles, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to your AI Research Assistant! 👋\n\nI can help you:\n• 🔍 Search across multiple academic databases\n• 📥 Download and analyze research papers\n• 📊 Identify research gaps and opportunities\n• 📄 Generate publication-ready documents\n\nTell me what research topic interests you!",
      timestamp: "Just now"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState("demo-session-123");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<{name: string; status: string} | null>(null);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate tool activity
    setActiveTool({ name: "Search Database", status: "Searching arXiv for relevant papers..." });

    // Simulate API response
    setTimeout(() => {
      setActiveTool(null);
      setToolsUsed(prev => [...prev, "arXiv Search"]);
      
      const aiMessage: Message = {
        role: "assistant",
        content: "I found several interesting papers related to your query. Let me analyze them and provide you with key insights...",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `Triggered: ${action}`,
    });
  };

  const handleNewSession = () => {
    setMessages([{
      role: "assistant",
      content: "New session started! How can I help you with your research today?",
      timestamp: new Date().toLocaleTimeString()
    }]);
    setToolsUsed([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated Background */}
      <div className="animated-grid-bg" />
      
      {/* Navbar */}
      <Navbar 
        sessionActive={true} 
        healthStatus="healthy"
        onNewSession={handleNewSession}
      />
      
      {/* Main Layout */}
      <div className="flex-1 flex pt-16">
        {/* Sidebar */}
        <Sidebar
          sessionId={sessionId}
          createdAt="5 minutes ago"
          toolsUsed={toolsUsed}
          papersFound={[]}
          pdfGenerated={false}
          onQuickAction={handleQuickAction}
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
                  icon={Search}
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
        disabled={false}
        isLoading={isLoading}
      />
    </div>
  );
}
