import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export const ChatInput = ({ onSend, disabled, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-primary/30 z-40">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-4xl mx-auto flex gap-2 sm:gap-3 items-end">
          {/* Input Area */}
          <div className="flex-1 relative">
          <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about research..."
              disabled={disabled || isLoading}
              className="min-h-[48px] sm:min-h-[56px] max-h-[120px] sm:max-h-[160px] resize-none bg-card border-border-accent focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground text-sm sm:text-base placeholder:text-foreground-secondary rounded-2xl pr-12 transition-all"
            />
            
            {/* Character Count */}
            <div className="absolute bottom-2 right-3 text-xs text-foreground-secondary hidden sm:block">
              {message.length}
            </div>
          </div>
          
          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed glow-orange transition-all hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        
        {/* Helper Text */}
        <div className="max-w-4xl mx-auto mt-2 text-center hidden sm:block">
          <span className="text-xs text-foreground-secondary">
            Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-foreground-secondary text-xs">Ctrl+Enter</kbd> to send
          </span>
        </div>
      </div>
    </div>
  );
};
