import { cn } from "../utils/cn";
import { DataTreeNode } from "./DataTreeNode";

interface DebugViewProps {
  data: unknown;
  className?: string;
  maxDepthLabel?: string;
}

export function DebugView({
  data,
  className,
  maxDepthLabel = "... (max depth)",
}: DebugViewProps) {
  if (data === null || data === undefined) {
    return (
      <div className={cn("overflow-auto p-4 font-mono text-xs", className)}>
        <div className="text-muted-foreground">null / undefined</div>
      </div>
    );
  }

  const isArray = Array.isArray(data);
  const entries: [string, unknown][] = isArray
    ? (data as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
    : typeof data === "object"
      ? Object.entries(data as Record<string, unknown>)
      : [];

  return (
    <div
      className={cn(
        "overflow-auto p-4 font-mono text-xs rounded-lg border bg-muted border-border/30",
        className
      )}
    >
      <div className="space-y-1">
        {entries.map(([key, value]) => (
          <DataTreeNode
            key={key}
            nodeKey={key}
            value={value}
            level={0}
            maxDepthLabel={maxDepthLabel}
          />
        ))}
      </div>
    </div>
  );
}
