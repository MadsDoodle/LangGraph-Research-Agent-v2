import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartSession = () => {
    toast({
      title: "Starting Research Session",
      description: "Initializing your AI research assistant...",
    });
    
    // Navigate to chat interface
    setTimeout(() => {
      navigate("/chat");
    }, 800);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero onStartSession={handleStartSession} />
      
      {/* Features Section */}
      <FeatureGrid />
    </div>
  );
};

export default Index;
