import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, GraduationCap, User } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-orange">Get In Touch</span>
          </h2>
          <p className="text-xl text-foreground-secondary">
            Let's discuss your research needs
          </p>
        </div>

        {/* Contact Card */}
        <Card className="glass-strong p-8 md:p-12 border-2 border-border-accent animate-slide-up">
          <div className="space-y-8">
            {/* Name */}
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground-secondary mb-1">Name</p>
                <p className="text-xl font-semibold text-foreground">Madhav S Baidya</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-foreground-secondary mb-1">Email</p>
                <a
                  href="mailto:madhavbaidyaiitbhu@gmail.com"
                  className="text-xl font-semibold text-primary hover:text-primary-light transition-colors"
                >
                  madhavbaidyaiitbhu@gmail.com
                </a>
              </div>
            </div>

            {/* Education */}
            <div className="flex items-start gap-4 group">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground-secondary mb-1">Education</p>
                <p className="text-xl font-semibold text-foreground">IIT (BHU)</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-primary-foreground font-semibold rounded-full glow-orange-lg hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = "mailto:madhavbaidyaiitbhu@gmail.com"}
              >
                Send Email
              </Button>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-foreground-secondary text-sm">
          <p>© 2025 AI Research Assistant. Built with ❤️ for academic excellence.</p>
        </div>
      </div>
    </section>
  );
};
