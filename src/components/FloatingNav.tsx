import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "features", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="glass-strong rounded-full px-6 py-3 flex items-center gap-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection(section.id)}
            className={`rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "text-foreground-secondary hover:text-foreground hover:bg-muted"
            }`}
          >
            {section.label}
          </Button>
        ))}
      </div>
    </nav>
  );
};
