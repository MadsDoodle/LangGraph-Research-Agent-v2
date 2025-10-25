import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const isUser = role === "user";
  
  return (
    <div className={cn(
      "flex gap-2 sm:gap-4 animate-slide-up mb-4 sm:mb-6",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center",
        isUser 
          ? "bg-primary/20 border border-primary/40" 
          : "bg-secondary border border-border"
      )}>
        {isUser ? (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        ) : (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        )}
      </div>
      
      {/* Message Bubble */}
      <div className={cn(
        "flex-1 max-w-[85%] sm:max-w-[80%]",
        isUser ? "flex flex-col items-end" : "flex flex-col items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg",
          isUser 
            ? "bg-card border-r-4 border-primary glow-orange" 
            : "bg-card-hover border border-border"
        )}>
          <div className="text-foreground leading-relaxed prose prose-invert prose-sm sm:prose-base max-w-none prose-p:my-2 prose-headings:my-3 prose-a:text-primary prose-a:font-semibold prose-strong:text-foreground prose-strong:font-bold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
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
