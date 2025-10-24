import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <div 
      className="group relative glass rounded-2xl p-8 hover:glass-strong hover:border-primary/50 hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient-orange transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-foreground-secondary leading-relaxed">
        {description}
      </p>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
