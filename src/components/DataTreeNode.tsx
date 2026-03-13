import { cn } from "../utils/cn";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface DataTreeNodeProps {
  nodeKey: string;
  value: unknown;
  level?: number;
  maxLevel?: number;
  maxDepthLabel?: string;
}

function getValueType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  return typeof value;
}

function isExpandable(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "object")
    return Object.keys(value as Record<string, unknown>).length > 0;
  return false;
}

function formatPrimitive(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  return String(value);
}

export function DataTreeNode({
  nodeKey,
  value,
  level = 0,
  maxLevel = 20,
  maxDepthLabel = "... (max depth)",
}: DataTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const expandable = isExpandable(value);
  const valueType = getValueType(value);
  const isArray = Array.isArray(value);

  const entries: [string, unknown][] = expandable
    ? isArray
      ? (value as unknown[]).map((v, i) => [String(i), v] as [string, unknown])
      : value !== null && value !== undefined && typeof value === "object"
        ? Object.entries(value as Record<string, unknown>)
        : []
    : [];

  if (level > maxLevel) {
    return (
      <div className="text-xs italic text-muted-foreground">
        {nodeKey}: {maxDepthLabel}
      </div>
    );
  }

  return (
    <div className="font-mono text-sm">
      <div className="flex gap-1 items-start">
        {expandable ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 p-0 transition-colors text-muted-foreground hover:text-foreground"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        ) : (
          <div className="w-4" />
        )}

        <span className="flex-shrink-0 font-semibold text-primary">
          {nodeKey}:
        </span>

        {!expandable && (
          <span
            className={cn(
              "text-foreground",
              valueType === "string" && "text-green-600"
            )}
          >
            {formatPrimitive(value)}
          </span>
        )}

        {expandable && !isExpanded && (
          <span className="text-muted-foreground">
            {isArray ? `[${entries.length}]` : `{${entries.length}}`}
          </span>
        )}
      </div>

      {expandable && isExpanded && (
        <div className="ml-4 border-l border-border/30 pl-2 mt-1 space-y-0.5">
          {entries.map(([key, val]) => (
            <DataTreeNode
              key={`${nodeKey}-${key}`}
              nodeKey={key}
              value={val}
              level={level + 1}
              maxLevel={maxLevel}
              maxDepthLabel={maxDepthLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
