import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  PenTool, 
  RotateCcw,
  Download,
  Clock,
  CheckCircle2,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SidebarProps {
  sessionId?: string;
  createdAt?: string;
  toolsUsed?: string[];
  papersFound?: string[];
  pdfGenerated?: boolean;
  onQuickAction?: (action: string) => void;
  onDownloadPdf?: () => void;
}

export const Sidebar = ({ 
  sessionId, 
  createdAt, 
  toolsUsed = [], 
  papersFound = [], 
  pdfGenerated,
  onQuickAction,
  onDownloadPdf
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden lg:block fixed left-0 top-16 bottom-0 glass-strong border-r border-primary/30 transition-all duration-300 z-30",
      collapsed ? "w-16" : "w-80"
    )}>
      {/* Toggle Button */}
      <Button
        onClick={() => setCollapsed(!collapsed)}
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-primary hover:bg-primary-light glow-orange z-10"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-primary-foreground" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-primary-foreground" />
        )}
      </Button>

      {/* Content */}
      <div className="h-full overflow-y-auto overflow-x-hidden py-6">
        {!collapsed ? (
          <div className="px-4 space-y-6">
            {/* Session Info */}
            {sessionId && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide">
                  Session Info
                </h3>
                <div className="glass rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse-orange" />
                    <span className="text-foreground-secondary">Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                    <Clock className="w-3 h-3" />
                    <span>{createdAt || "Just now"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => onQuickAction?.("search_all")}
                  className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30 hover:border-primary/50 transition-all"
                  variant="outline"
                >
                  <Search className="w-4 h-4 mr-2 text-primary" />
                  Search All Databases
                </Button>
                <Button
                  onClick={() => onQuickAction?.("write_paper")}
                  className="w-full justify-start bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/30 hover:border-primary/50 transition-all"
                  variant="outline"
                >
                  <PenTool className="w-4 h-4 mr-2 text-primary" />
                  Write Research Paper
                </Button>
                <Button
                  onClick={() => onQuickAction?.("new")}
                  className="w-full justify-start bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-all"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start New Session
                </Button>
              </div>
            </div>

            {/* Expandable Sections */}
            <Accordion type="multiple" defaultValue={["tools", "papers"]} className="space-y-2">
              {/* Tools Used */}
              <AccordionItem value="tools" className="border-none">
                <AccordionTrigger className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide hover:no-underline py-2">
                  Tools Used ({toolsUsed.length})
                </AccordionTrigger>
                <AccordionContent>
                  {toolsUsed.length > 0 ? (
                    <div className="space-y-2">
                      {toolsUsed.map((tool, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm glass rounded-lg p-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground-secondary truncate">{tool}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground-secondary italic">No tools used yet</p>
                  )}
                </AccordionContent>
              </AccordionItem>

              {/* Papers Found */}
              <AccordionItem value="papers" className="border-none">
                <AccordionTrigger className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide hover:no-underline py-2">
                  Papers Found ({papersFound.length})
                </AccordionTrigger>
                <AccordionContent>
                  {papersFound.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {papersFound.map((paper, idx) => (
                        <div key={idx} className="glass rounded-lg p-2 hover:bg-card-hover transition-colors cursor-pointer group">
                          <p className="text-sm text-foreground-secondary line-clamp-2 group-hover:text-foreground transition-colors">
                            {paper}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground-secondary italic">No papers discovered yet</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* PDF Status */}
            {pdfGenerated && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground-secondary uppercase tracking-wide">
                  PDF Status
                </h3>
                <div className="glass rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-foreground">PDF Generated</span>
                  </div>
                  <Button 
                    onClick={onDownloadPdf}
                    className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary glow-orange"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Collapsed View - Icons Only
          <div className="flex flex-col items-center gap-4 px-2">
            <Button
              onClick={() => onQuickAction?.("search_all")}
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10"
              title="Search All Databases"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onQuickAction?.("write_paper")}
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10"
              title="Write Research Paper"
            >
              <PenTool className="w-5 h-5" />
            </Button>
            {pdfGenerated && (
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
