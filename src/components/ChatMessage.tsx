import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === "user";
  
  return (
    <div className={cn(
      "flex gap-4 animate-slide-up mb-6",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
        isUser 
          ? "bg-primary/20 border border-primary/40" 
          : "bg-secondary border border-border"
      )}>
        {isUser ? (
          <User className="w-5 h-5 text-primary" />
        ) : (
          <Bot className="w-5 h-5 text-primary" />
        )}
      </div>
      
      {/* Message Bubble */}
      <div className={cn(
        "flex-1 max-w-[85%]",
        isUser ? "flex flex-col items-end" : "flex flex-col items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-6 py-4 shadow-lg",
          isUser 
            ? "bg-card border-r-4 border-primary glow-orange" 
            : "bg-card-hover border border-border"
        )}>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
        
        {timestamp && (
          <span className="text-xs text-foreground-secondary mt-2 px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};
