import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onStartSession: () => void;
}

export const Hero = ({ onStartSession }: HeroProps) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Grid Background */}
      <div className="animated-grid-bg">
        <div className="grid-overlay" />
        <div className="glow-spot glow-spot-1" />
        <div className="glow-spot glow-spot-2" />
        <div className="glow-spot glow-spot-3" />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-bounce-in">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-orange" />
          <span className="text-sm text-foreground-secondary">Powered by Advanced AI</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="text-gradient-orange">AI-Powered</span>
          <br />
          <span className="text-foreground">Research Assistant</span>
        </h1>
        
        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-foreground-secondary mb-12 max-w-3xl mx-auto">
          Search, Analyze, and Generate Academic Papers in Minutes
        </p>
        
        {/* CTA Button */}
        <Button
          onClick={onStartSession}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full glow-orange-lg hover:scale-105 transition-all duration-300 group"
        >
          Start Research Session
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};
