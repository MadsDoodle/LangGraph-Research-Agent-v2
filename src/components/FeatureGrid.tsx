import { Search, Download, LineChart, FileText } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Search,
    title: "Multi-Database Search",
    description: "Search across arXiv, PubMed, Semantic Scholar, and CrossRef simultaneously for comprehensive research coverage."
  },
  {
    icon: Download,
    title: "Paper Download & Analysis",
    description: "Automatically download papers and extract key insights, methodologies, and findings using advanced AI."
  },
  {
    icon: LineChart,
    title: "Research Gap Identification",
    description: "Discover unexplored areas and potential research directions based on comprehensive literature analysis."
  },
  {
    icon: FileText,
    title: "PDF Generation",
    description: "Generate publication-ready documents with proper citations, formatting, and academic structure."
  }
];

export const FeatureGrid = () => {
  return (
    <div className="relative py-24 px-4">
      {/* Section Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Powerful Research Tools
        </h2>
        <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
          Everything you need for comprehensive academic research in one intelligent platform
        </p>
      </div>
      
      {/* Feature Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
};
