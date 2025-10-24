import { useNavigate } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Contact } from "@/components/Contact";
import { FloatingNav } from "@/components/FloatingNav";
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
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Hero Section */}
      <Hero onStartSession={handleStartSession} />
      
      {/* Features Section */}
      <FeatureGrid />
      
      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Index;
