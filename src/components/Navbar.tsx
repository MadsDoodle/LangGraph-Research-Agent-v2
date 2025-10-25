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
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Logo & Status */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-base sm:text-xl font-bold text-gradient-orange">ResearchAI</span>
          </div>
          
          {sessionActive && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
              <div className={`w-2 h-2 rounded-full ${statusColors[healthStatus]} animate-pulse-orange`} />
              <span className="text-sm text-foreground-secondary">Active Session</span>
            </div>
          )}
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {sessionActive && (
            <Button
              onClick={onNewSession}
              variant="outline"
              size="sm"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-colors text-xs sm:text-sm px-2 sm:px-4"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">New Session</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground-secondary hover:text-primary hover:bg-secondary transition-colors w-8 h-8 sm:w-10 sm:h-10"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
