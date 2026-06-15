"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Download } from "lucide-react";

interface ToolLayoutBaseProps {
  className?: string;
}

interface TwoPanelProps extends ToolLayoutBaseProps {
  toolName?: string;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
  title?: never;
  description?: never;
  children?: never;
}

interface PageLayoutProps extends ToolLayoutBaseProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  toolName?: never;
  leftPanel?: never;
  rightPanel?: never;
  leftTitle?: never;
  rightTitle?: never;
  leftActions?: never;
  rightActions?: never;
}

type ToolLayoutProps = TwoPanelProps | PageLayoutProps;

export default function ToolLayout(props: ToolLayoutProps) {
  // Page layout mode (title + description + children)
  if ("title" in props && props.title !== undefined) {
    const { title, description, children, className } = props;
    return (
      <div className={cn("flex flex-1 flex-col", className)}>
        {/* Page header */}
        <div className="border-b border-border px-4 sm:px-6 py-4">
          <h1 className="font-heading text-xl font-semibold tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {/* Page content */}
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  // Two-panel layout mode
  const {
    toolName = "",
    leftPanel,
    rightPanel,
    leftTitle = "Input",
    rightTitle = "Output",
    leftActions,
    rightActions,
    className,
  } = props;

  return (
    <div className={cn("flex flex-1 flex-col", className)}>
      {/* Tool header */}
      {toolName && (
        <div className="border-b border-border px-4 sm:px-6 py-3">
          <h1 className="font-heading text-lg font-semibold tracking-tight">
            {toolName}
          </h1>
        </div>
      )}

      {/* Panels */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left panel */}
        <div className="flex flex-1 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {leftTitle}
            </span>
            <div className="flex items-center gap-1">{leftActions}</div>
          </div>
          <div className="flex-1">{leftPanel}</div>
        </div>

        {/* Right panel */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {rightTitle}
            </span>
            <div className="flex items-center gap-1">
              {rightActions ?? (
                <>
                  <Button variant="ghost" size="icon-sm" title="Copy output">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" title="Clear output">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    title="Download output"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1">{rightPanel}</div>
        </div>
      </div>
    </div>
  );
}
