import { Loader2, LucideIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ToolActivityProps {
  toolName: string;
  icon: LucideIcon;
  status: string;
  progress?: number;
}

export const ToolActivity = ({ toolName, icon: Icon, status, progress }: ToolActivityProps) => {
  return (
    <div className="glass-strong rounded-2xl p-4 border border-primary/50 glow-orange animate-slide-up mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary animate-pulse-orange" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground">{toolName}</h4>
          <p className="text-xs text-foreground-secondary">{status}</p>
        </div>
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
      </div>
      
      {progress !== undefined && (
        <Progress value={progress} className="h-1 bg-secondary" />
      )}
    </div>
  );
};
