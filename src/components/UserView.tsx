import { filterDataByKeys, type FilterKeysOptions } from "../utils/filterDataByKeys";
import { cn } from "../utils/cn";
import type React from "react";
import { useMemo } from "react";
import { interpolate } from "../i18n/defaultLabels";

export interface UserViewLabels {
  yes?: string;
  no?: string;
  shareablePreviewEmptyList?: string;
  shareablePreviewEmptyObject?: string;
  shareablePreviewNoValue?: string;
  shareablePreviewItemLabel?: string;
  shareablePreviewEntriesCount?: string;
  shareablePreviewArrayLabel?: string;
  shareablePreviewNestedObjectLabel?: string;
}

interface UserViewProps extends Partial<FilterKeysOptions> {
  data: unknown;
  className?: string;
  expandByDefault?: boolean;
  labels?: UserViewLabels;
}

const MAX_RENDER_DEPTH = 6;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPrimitive = (value: unknown): value is string | number | boolean =>
  ["string", "number", "boolean"].includes(typeof value);

const formatKey = (key: string) =>
  key
    .replace(/[_-]/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();

const stringifyValue = (value: unknown) => {
  if (typeof value === "string") return value;

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

export function UserView({
  data,
  className,
  labels: labelsOverride = {},
  includedKeys,
  excludedKeys,
  includedNestedKeys,
  excludedNestedKeys,
  maxDepth,
}: UserViewProps) {
  const displayData = useMemo(() => {
    const opts: FilterKeysOptions = {
      includedKeys,
      excludedKeys,
      includedNestedKeys,
      excludedNestedKeys,
      maxDepth,
    };
    return filterDataByKeys(data, opts);
  }, [
    data,
    includedKeys,
    excludedKeys,
    includedNestedKeys,
    excludedNestedKeys,
    maxDepth,
  ]);

  const labels = {
    yes: labelsOverride.yes ?? "Yes",
    no: labelsOverride.no ?? "No",
    shareablePreviewEmptyList:
      labelsOverride.shareablePreviewEmptyList ?? "Empty list",
    shareablePreviewEmptyObject:
      labelsOverride.shareablePreviewEmptyObject ?? "Empty object",
    shareablePreviewNoValue:
      labelsOverride.shareablePreviewNoValue ?? "No value",
    shareablePreviewItemLabel:
      labelsOverride.shareablePreviewItemLabel ?? "Item {{index}}",
    shareablePreviewEntriesCount:
      labelsOverride.shareablePreviewEntriesCount ?? "{{count}} field(s)",
    shareablePreviewArrayLabel:
      labelsOverride.shareablePreviewArrayLabel ?? "{{count}} item(s)",
    shareablePreviewNestedObjectLabel:
      labelsOverride.shareablePreviewNestedObjectLabel ?? "Nested content",
  };

  const t = (key: keyof typeof labels, params?: Record<string, string | number>) =>
    params ? interpolate(labels[key] ?? key, params) : labels[key] ?? key;

  const renderPrimitive = (value: string | number | boolean) => {
    if (typeof value === "boolean") {
      return (
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full",
            value
              ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-400/20 dark:text-emerald-100"
              : "bg-slate-100 text-slate-700 dark:bg-slate-400/20 dark:text-slate-100"
          )}
        >
          {t(value ? "yes" : "no")}
        </span>
      );
    }

    if (typeof value === "number") {
      const safeNum =
        value == null || Number.isNaN(value) ? "—" : value.toLocaleString();
      return (
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {safeNum}
        </span>
      );
    }

    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground">
        {value}
      </p>
    );
  };

  function renderArray(
    value: unknown[],
    depth: number,
    parentKey: string,
    inline = false
  ): React.ReactNode {
    if (value.length === 0) {
      return (
        <span className="text-sm italic text-muted-foreground">
          {t("shareablePreviewEmptyList")}
        </span>
      );
    }

    if (value.every((item) => isPrimitive(item))) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <span
              key={`${parentKey}-primitive-${index}`}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm"
            >
              {typeof item === "boolean"
                ? t(item ? "yes" : "no")
                : typeof item === "number"
                  ? item == null || Number.isNaN(item)
                    ? "—"
                    : item.toLocaleString()
                  : String(item)}
            </span>
          ))}
        </div>
      );
    }

    const containsStructuredContent =
      value.some((item) => isPlainObject(item)) ||
      value.some((item) => Array.isArray(item));

    if (containsStructuredContent) {
      if (inline) {
        return (
          <div className="space-y-3">
            {value.map((item, index) => (
              <div
                key={`${parentKey}-object-inline-${index}`}
                className="px-3 py-2 bg-white rounded-lg ring-1 shadow-sm ring-border/40 shadow-foreground/10 dark:bg-slate-900"
              >
                <div className="flex justify-between items-center mb-2 text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  <span>
                    {t("shareablePreviewItemLabel", { index: index + 1 })}
                  </span>
                  {isPlainObject(item) && (
                    <span className="font-medium lowercase text-muted-foreground">
                      {t("shareablePreviewEntriesCount", {
                        count: Object.keys(
                          item as Record<string, unknown>
                        ).length,
                      })}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {renderValue(item, depth + 1, `${parentKey}[${index}]`, true)}
                </div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {value.map((item, index) => (
            <div
              key={`${parentKey}-object-${index}`}
              className="bg-white rounded-xl border shadow-xl border-border/40 shadow-foreground/10 dark:bg-slate-900"
            >
              <div className="flex justify-between items-center px-4 py-2 text-xs font-medium tracking-wide uppercase border-b border-border/40 bg-muted/40 text-muted-foreground">
                <span>
                  {t("shareablePreviewItemLabel", { index: index + 1 })}
                </span>
                {isPlainObject(item) && (
                  <span>
                    {t("shareablePreviewEntriesCount", {
                      count: Object.keys(
                        item as Record<string, unknown>
                      ).length,
                    })}
                  </span>
                )}
              </div>
              <div className="px-4 py-3 space-y-2">
                {renderValue(item, depth + 1, `${parentKey}[${index}]`, true)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={`${parentKey}-fallback-${index}`}
            className="px-3 py-2 text-xs bg-white rounded-lg border shadow-sm border-border/30 text-muted-foreground shadow-foreground/10 dark:bg-slate-900"
          >
            {renderValue(item, depth + 1, `${parentKey}[${index}]`, true)}
          </div>
        ))}
      </div>
    );
  }

  function renderObject(
    value: Record<string, unknown>,
    depth: number,
    parentKey: string,
    inline = false
  ): React.ReactNode {
    const entries = Object.entries(value);

    if (entries.length === 0) {
      return (
        <span className="text-sm italic text-muted-foreground">
          {t("shareablePreviewEmptyObject")}
        </span>
      );
    }

    if (inline) {
      return (
        <div className="space-y-2">
          {entries.map(([key, val]) => (
            <div
              key={`${parentKey}-${key}`}
              className="px-3 py-2 bg-white rounded-lg ring-1 shadow-sm ring-border/30 shadow-foreground/10 dark:bg-slate-900/90"
            >
              <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                {formatKey(key)}
              </span>
              <div className="mt-1 text-sm text-foreground">
                {renderValue(val, depth + 1, `${parentKey}.${key}`, true)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    const gridClass =
      depth === 0
        ? "grid gap-4 md:grid-cols-2"
        : depth === 1
          ? "grid gap-3 md:grid-cols-1"
          : "space-y-3";

    return (
      <div className={gridClass}>
        {entries.map(([key, val]) => (
          <div
            key={`${parentKey}-${key}`}
            className={cn(
              "bg-white rounded-xl border shadow-xl border-border/30 shadow-foreground/10 dark:bg-slate-900"
            )}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-border/30 bg-muted/30">
              <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                {formatKey(key)}
              </span>
            </div>
            <div className="px-4 py-3 space-y-2">
              {renderValue(val, depth + 1, `${parentKey}.${key}`, true)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderValue(
    value: unknown,
    depth: number,
    parentKey: string,
    inline = false
  ): React.ReactNode {
    if (depth > MAX_RENDER_DEPTH) {
      return (
        <pre className="overflow-auto px-3 py-2 max-h-48 text-xs bg-white rounded-md border shadow-inner border-border/30 text-muted-foreground shadow-foreground/5 dark:bg-slate-900">
          {stringifyValue(value)}
        </pre>
      );
    }

    if (value === null || value === undefined) {
      return (
        <span className="text-sm italic text-muted-foreground">
          {t("shareablePreviewNoValue")}
        </span>
      );
    }

    if (isPrimitive(value)) {
      return renderPrimitive(value);
    }

    if (Array.isArray(value)) {
      return renderArray(value, depth, parentKey, inline);
    }

    if (isPlainObject(value)) {
      return renderObject(value, depth, parentKey, inline);
    }

    return (
      <pre className="px-3 py-2 text-xs bg-white rounded-md border shadow-inner border-border/30 text-muted-foreground shadow-foreground/5 dark:bg-slate-900">
        {stringifyValue(value)}
      </pre>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {renderValue(displayData, 0, "root")}
    </div>
  );
}
