import { Button } from "@/components/ui/button";
import { Activity, Plus, Settings } from "lucide-react";

interface NavbarProps {
  sessionActive?: boolean;
  healthStatus?: "healthy" | "warning" | "error";
  onNewSession?: () => void;
}

export const Navbar = ({ sessionActive, healthStatus = "healthy", onNewSession }: NavbarProps) => {
  const statusColors = {
    healthy: "bg-success",
    warning: "bg-warning",
    error: "bg-destructive"
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border-accent">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo & Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient-orange">ResearchAI</span>
          </div>
          
          {sessionActive && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <div className={`w-2 h-2 rounded-full ${statusColors[healthStatus]} animate-pulse-orange`} />
              <span className="text-sm text-foreground-secondary">Active Session</span>
            </div>
          )}
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {sessionActive && (
            <Button
              onClick={onNewSession}
              variant="outline"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground-secondary hover:text-primary hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
