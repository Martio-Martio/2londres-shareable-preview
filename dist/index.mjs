import * as React5 from 'react';
import React5__default, { forwardRef, useState, useMemo, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, CheckCircle, ChevronRight, Eye, Bug, Code, Copy, Share2, Download, ChevronUp, ChevronDown, XCircle, Trash2, Pencil } from 'lucide-react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

// src/ShareablePreview.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-green-600 text-destructive-foreground hover:bg-green-900/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        warning: "bg-yellow-500 text-white hover:bg-yellow-500/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React5.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
var Card = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bg-black/70 backdrop-blur-sm",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName ?? "DialogOverlay";
var DialogContent = React5.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName ?? "DialogContent";
var Tabs = TabsPrimitive.Root;
var TabsList = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
var TabsTrigger = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
var TabsContent = React5.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
var gradientVariants = {
  green: {
    base: "from-green-600 to-green-700",
    hover: "hover:from-green-700 hover:to-green-800",
    shadow: "hover:shadow-green-400/50"
  },
  blue: {
    base: "from-blue-600 to-blue-700",
    hover: "hover:from-blue-700 hover:to-blue-800",
    shadow: "hover:shadow-blue-400/50"
  },
  purple: {
    base: "from-purple-600 to-purple-700",
    hover: "hover:from-purple-700 hover:to-purple-800",
    shadow: "hover:shadow-purple-400/50"
  },
  orange: {
    base: "from-orange-600 to-orange-700",
    hover: "hover:from-orange-700 hover:to-orange-800",
    shadow: "hover:shadow-orange-400/50"
  },
  red: {
    base: "from-red-600 to-red-700",
    hover: "hover:from-red-700 hover:to-red-800",
    shadow: "hover:shadow-red-400/50"
  }
};
var ValidationButton = forwardRef(
  ({
    children,
    className,
    withPulse = false,
    withIndicator = true,
    variant = "green",
    icon: Icon = CheckCircle,
    ...props
  }, ref) => {
    const gradients = gradientVariants[variant];
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        size: "lg",
        className: cn(
          "px-8 py-4 font-bold text-white border-0 shadow-xl transition-all duration-300 relative",
          `bg-gradient-to-r ${gradients.base}`,
          `${gradients.hover} hover:scale-105 hover:shadow-2xl ${gradients.shadow}`,
          withPulse && "animate-pulse",
          "focus:animate-none hover:animate-none",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center mr-3 w-6 h-6 rounded-full bg-white/20", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }) }),
          children,
          withIndicator && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" })
        ]
      }
    );
  }
);
ValidationButton.displayName = "ValidationButton";
function getValueType(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") return "object";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") return "string";
  return typeof value;
}
function isExpandable(value) {
  if (value === null || value === void 0) return false;
  if (typeof value === "object")
    return Object.keys(value).length > 0;
  return false;
}
function formatPrimitive(value) {
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  return String(value);
}
function DataTreeNode({
  nodeKey,
  value,
  level = 0,
  maxLevel = 20,
  maxDepthLabel = "... (max depth)"
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const expandable = isExpandable(value);
  const valueType = getValueType(value);
  const isArray = Array.isArray(value);
  const entries = expandable ? isArray ? value.map((v, i) => [String(i), v]) : value !== null && value !== void 0 && typeof value === "object" ? Object.entries(value) : [] : [];
  if (level > maxLevel) {
    return /* @__PURE__ */ jsxs("div", { className: "text-xs italic text-muted-foreground", children: [
      nodeKey,
      ": ",
      maxDepthLabel
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "font-mono text-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 items-start", children: [
      expandable ? /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsExpanded(!isExpanded),
          className: "flex-shrink-0 p-0 transition-colors text-muted-foreground hover:text-foreground",
          "aria-label": isExpanded ? "Collapse" : "Expand",
          children: /* @__PURE__ */ jsx(
            ChevronRight,
            {
              className: cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )
            }
          )
        }
      ) : /* @__PURE__ */ jsx("div", { className: "w-4" }),
      /* @__PURE__ */ jsxs("span", { className: "flex-shrink-0 font-semibold text-primary", children: [
        nodeKey,
        ":"
      ] }),
      !expandable && /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "text-foreground",
            valueType === "string" && "text-green-600"
          ),
          children: formatPrimitive(value)
        }
      ),
      expandable && !isExpanded && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: isArray ? `[${entries.length}]` : `{${entries.length}}` })
    ] }),
    expandable && isExpanded && /* @__PURE__ */ jsx("div", { className: "ml-4 border-l border-border/30 pl-2 mt-1 space-y-0.5", children: entries.map(([key, val]) => /* @__PURE__ */ jsx(
      DataTreeNode,
      {
        nodeKey: key,
        value: val,
        level: level + 1,
        maxLevel,
        maxDepthLabel
      },
      `${nodeKey}-${key}`
    )) })
  ] });
}
function DebugView({
  data,
  className,
  maxDepthLabel = "... (max depth)"
}) {
  if (data === null || data === void 0) {
    return /* @__PURE__ */ jsx("div", { className: cn("overflow-auto p-4 font-mono text-xs", className), children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "null / undefined" }) });
  }
  const isArray = Array.isArray(data);
  const entries = isArray ? data.map((v, i) => [String(i), v]) : typeof data === "object" ? Object.entries(data) : [];
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "overflow-auto p-4 font-mono text-xs rounded-lg border bg-muted border-border/30",
        className
      ),
      children: /* @__PURE__ */ jsx("div", { className: "space-y-1", children: entries.map(([key, value]) => /* @__PURE__ */ jsx(
        DataTreeNode,
        {
          nodeKey: key,
          value,
          level: 0,
          maxDepthLabel
        },
        key
      )) })
    }
  );
}

// src/utils/filterDataByKeys.ts
var isPlainObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
var pathMatchesIncluded = (currentPath, paths) => paths.has(currentPath) || Array.from(paths).some((p) => p.startsWith(`${currentPath}.`));
var pathMatchesExcluded = (currentPath, paths) => paths.has(currentPath) || Array.from(paths).some(
  (p) => currentPath.startsWith(`${p}.`) || currentPath === p
);
function filterObjectRecursive(obj, options, currentPath, depth) {
  const {
    includedKeys,
    excludedKeys,
    includedNestedKeys,
    excludedNestedKeys,
    maxDepth = 20
  } = options;
  const incSet = includedKeys?.length ? new Set(includedKeys) : null;
  const excSet = excludedKeys?.length ? new Set(excludedKeys) : null;
  const incNestedSet = includedNestedKeys?.length ? new Set(includedNestedKeys) : null;
  const excNestedSet = excludedNestedKeys?.length ? new Set(excludedNestedKeys) : null;
  const shouldIncludeTopLevel = (key) => {
    if (incSet) return incSet.has(key);
    if (excSet && excSet.has(key)) return false;
    return true;
  };
  const shouldIncludeNested = (path) => {
    if (incNestedSet && incNestedSet.size > 0)
      return pathMatchesIncluded(path, incNestedSet);
    if (excNestedSet && pathMatchesExcluded(path, excNestedSet)) return false;
    return true;
  };
  const result = {};
  const entries = Object.entries(obj);
  const isTopLevel = !currentPath;
  for (const [key, value] of entries) {
    const childPath = currentPath ? `${currentPath}.${key}` : key;
    if (isTopLevel) {
      if (incNestedSet?.size ? !shouldIncludeNested(childPath) : !shouldIncludeTopLevel(key))
        continue;
    } else if (!shouldIncludeNested(childPath)) {
      continue;
    }
    if (depth >= maxDepth) {
      result[key] = value;
      continue;
    }
    if (Array.isArray(value)) {
      result[key] = value.map(
        (item, i) => isPlainObject(item) ? filterObjectRecursive(item, options, `${childPath}[${i}]`, depth + 1) : item
      );
    } else if (isPlainObject(value)) {
      result[key] = filterObjectRecursive(value, options, childPath, depth + 1);
    } else {
      result[key] = value;
    }
  }
  return result;
}
function filterDataByKeys(data, options) {
  if (!options || !options.includedKeys?.length && !options.excludedKeys?.length && !options.includedNestedKeys?.length && !options.excludedNestedKeys?.length) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(
      (item, i) => isPlainObject(item) ? filterObjectRecursive(
        item,
        options,
        `[${i}]`,
        0
      ) : item
    );
  }
  if (isPlainObject(data)) {
    return filterObjectRecursive(
      data,
      options,
      "",
      0
    );
  }
  return data;
}

// src/i18n/defaultLabels.ts
var DEFAULT_LABELS = {
  yes: "Yes",
  no: "No",
  shareablePreviewCopySuccess: "Data copied to the clipboard.",
  shareablePreviewShareLinkCopied: "The share link has been copied.",
  shareablePreviewShareUnavailable: "Sharing is unavailable for this preview.",
  shareablePreviewDownloadSuccess: "Data has been downloaded.",
  shareablePreviewClipboardError: "Unable to copy data, please try again.",
  shareablePreviewClipboardUnsupported: "Clipboard copy is not supported on this device.",
  shareablePreviewDownloadUnavailable: "Download is unavailable on this device.",
  shareablePreviewDefaultTitle: "Preview",
  shareablePreviewOpen: "Open preview",
  shareablePreviewDebugMode: "Debug",
  shareablePreviewUserMode: "User",
  shareablePreviewSwitchToUser: "Switch to user view",
  shareablePreviewSwitchToDebug: "Switch to debug view",
  shareablePreviewCopyData: "Copy data",
  shareablePreviewCopyShareLink: "Copy share link",
  shareablePreviewDownloadData: "Download data",
  shareablePreviewCollapseContent: "Collapse content",
  shareablePreviewExpandContent: "Expand content",
  shareablePreviewDataTypeArray: "Array",
  shareablePreviewDataTypeObject: "Object",
  shareablePreviewDataTypeHtml: "HTML",
  shareablePreviewDataTypeText: "Text",
  shareablePreviewDataTypeString: "String",
  shareablePreviewDataTypeNumber: "Number",
  shareablePreviewDataTypeBoolean: "Boolean",
  shareablePreviewDataTypeUndefined: "Undefined",
  shareablePreviewDataTypeFunction: "Function",
  shareablePreviewDataTypeSymbol: "Symbol",
  shareablePreviewDataTypeBigint: "BigInt",
  shareablePreviewEmptyList: "Empty list",
  shareablePreviewEmptyObject: "Empty object",
  shareablePreviewMaxDepth: "Maximum depth reached",
  shareablePreviewItemLabel: "Item {{index}}",
  shareablePreviewEntriesCount: "{{count}} field(s)",
  shareablePreviewArrayLabel: "{{count}} item(s)",
  shareablePreviewNestedObjectLabel: "Nested content",
  shareablePreviewNoValue: "No value",
  shareablePreviewGeneralInfo: "General information"
};
function interpolate(template, params) {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`{{${key}}}`, String(value)),
    template
  );
}
var MAX_RENDER_DEPTH = 6;
var isPlainObject2 = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
var isPrimitive = (value) => ["string", "number", "boolean"].includes(typeof value);
var formatKey = (key) => key.replace(/[_-]/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim();
var stringifyValue = (value) => {
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};
function UserView({
  data,
  className,
  labels: labelsOverride = {},
  includedKeys,
  excludedKeys,
  includedNestedKeys,
  excludedNestedKeys,
  maxDepth
}) {
  const displayData = useMemo(() => {
    const opts = {
      includedKeys,
      excludedKeys,
      includedNestedKeys,
      excludedNestedKeys,
      maxDepth
    };
    return filterDataByKeys(data, opts);
  }, [
    data,
    includedKeys,
    excludedKeys,
    includedNestedKeys,
    excludedNestedKeys,
    maxDepth
  ]);
  const labels = {
    yes: labelsOverride.yes ?? "Yes",
    no: labelsOverride.no ?? "No",
    shareablePreviewEmptyList: labelsOverride.shareablePreviewEmptyList ?? "Empty list",
    shareablePreviewEmptyObject: labelsOverride.shareablePreviewEmptyObject ?? "Empty object",
    shareablePreviewNoValue: labelsOverride.shareablePreviewNoValue ?? "No value",
    shareablePreviewItemLabel: labelsOverride.shareablePreviewItemLabel ?? "Item {{index}}",
    shareablePreviewEntriesCount: labelsOverride.shareablePreviewEntriesCount ?? "{{count}} field(s)",
    shareablePreviewArrayLabel: labelsOverride.shareablePreviewArrayLabel ?? "{{count}} item(s)",
    shareablePreviewNestedObjectLabel: labelsOverride.shareablePreviewNestedObjectLabel ?? "Nested content"
  };
  const t = (key, params) => params ? interpolate(labels[key] ?? key, params) : labels[key] ?? key;
  const renderPrimitive = (value) => {
    if (typeof value === "boolean") {
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: cn(
            "inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide uppercase rounded-full",
            value ? "text-emerald-700 bg-emerald-100 dark:bg-emerald-400/20 dark:text-emerald-100" : "bg-slate-100 text-slate-700 dark:bg-slate-400/20 dark:text-slate-100"
          ),
          children: t(value ? "yes" : "no")
        }
      );
    }
    if (typeof value === "number") {
      const safeNum = value == null || Number.isNaN(value) ? "\u2014" : value.toLocaleString();
      return /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold tracking-tight text-foreground", children: safeNum });
    }
    return /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed whitespace-pre-wrap break-words text-foreground", children: value });
  };
  function renderArray(value, depth, parentKey, inline = false) {
    if (value.length === 0) {
      return /* @__PURE__ */ jsx("span", { className: "text-sm italic text-muted-foreground", children: t("shareablePreviewEmptyList") });
    }
    if (value.every((item) => isPrimitive(item))) {
      return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: value.map((item, index) => /* @__PURE__ */ jsx(
        "span",
        {
          className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-sm",
          children: typeof item === "boolean" ? t(item ? "yes" : "no") : typeof item === "number" ? item == null || Number.isNaN(item) ? "\u2014" : item.toLocaleString() : String(item)
        },
        `${parentKey}-primitive-${index}`
      )) });
    }
    const containsStructuredContent = value.some((item) => isPlainObject2(item)) || value.some((item) => Array.isArray(item));
    if (containsStructuredContent) {
      if (inline) {
        return /* @__PURE__ */ jsx("div", { className: "space-y-3", children: value.map((item, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "px-3 py-2 bg-white rounded-lg ring-1 shadow-sm ring-border/40 shadow-foreground/10 dark:bg-slate-900",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-2 text-xs font-semibold tracking-wide uppercase text-muted-foreground", children: [
                /* @__PURE__ */ jsx("span", { children: t("shareablePreviewItemLabel", { index: index + 1 }) }),
                isPlainObject2(item) && /* @__PURE__ */ jsx("span", { className: "font-medium lowercase text-muted-foreground", children: t("shareablePreviewEntriesCount", {
                  count: Object.keys(
                    item
                  ).length
                }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "space-y-2", children: renderValue(item, depth + 1, `${parentKey}[${index}]`, true) })
            ]
          },
          `${parentKey}-object-inline-${index}`
        )) });
      }
      return /* @__PURE__ */ jsx("div", { className: "space-y-4", children: value.map((item, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white rounded-xl border shadow-xl border-border/40 shadow-foreground/10 dark:bg-slate-900",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-4 py-2 text-xs font-medium tracking-wide uppercase border-b border-border/40 bg-muted/40 text-muted-foreground", children: [
              /* @__PURE__ */ jsx("span", { children: t("shareablePreviewItemLabel", { index: index + 1 }) }),
              isPlainObject2(item) && /* @__PURE__ */ jsx("span", { children: t("shareablePreviewEntriesCount", {
                count: Object.keys(
                  item
                ).length
              }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 py-3 space-y-2", children: renderValue(item, depth + 1, `${parentKey}[${index}]`, true) })
          ]
        },
        `${parentKey}-object-${index}`
      )) });
    }
    return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: value.map((item, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "px-3 py-2 text-xs bg-white rounded-lg border shadow-sm border-border/30 text-muted-foreground shadow-foreground/10 dark:bg-slate-900",
        children: renderValue(item, depth + 1, `${parentKey}[${index}]`, true)
      },
      `${parentKey}-fallback-${index}`
    )) });
  }
  function renderObject(value, depth, parentKey, inline = false) {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return /* @__PURE__ */ jsx("span", { className: "text-sm italic text-muted-foreground", children: t("shareablePreviewEmptyObject") });
    }
    if (inline) {
      return /* @__PURE__ */ jsx("div", { className: "space-y-2", children: entries.map(([key, val]) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "px-3 py-2 bg-white rounded-lg ring-1 shadow-sm ring-border/30 shadow-foreground/10 dark:bg-slate-900/90",
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold tracking-wide uppercase text-muted-foreground", children: formatKey(key) }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm text-foreground", children: renderValue(val, depth + 1, `${parentKey}.${key}`, true) })
          ]
        },
        `${parentKey}-${key}`
      )) });
    }
    const gridClass = depth === 0 ? "grid gap-4 md:grid-cols-2" : depth === 1 ? "grid gap-3 md:grid-cols-1" : "space-y-3";
    return /* @__PURE__ */ jsx("div", { className: gridClass, children: entries.map(([key, val]) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-white rounded-xl border shadow-xl border-border/30 shadow-foreground/10 dark:bg-slate-900"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center px-4 py-2 border-b border-border/30 bg-muted/30", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold tracking-wide uppercase text-muted-foreground", children: formatKey(key) }) }),
          /* @__PURE__ */ jsx("div", { className: "px-4 py-3 space-y-2", children: renderValue(val, depth + 1, `${parentKey}.${key}`, true) })
        ]
      },
      `${parentKey}-${key}`
    )) });
  }
  function renderValue(value, depth, parentKey, inline = false) {
    if (depth > MAX_RENDER_DEPTH) {
      return /* @__PURE__ */ jsx("pre", { className: "overflow-auto px-3 py-2 max-h-48 text-xs bg-white rounded-md border shadow-inner border-border/30 text-muted-foreground shadow-foreground/5 dark:bg-slate-900", children: stringifyValue(value) });
    }
    if (value === null || value === void 0) {
      return /* @__PURE__ */ jsx("span", { className: "text-sm italic text-muted-foreground", children: t("shareablePreviewNoValue") });
    }
    if (isPrimitive(value)) {
      return renderPrimitive(value);
    }
    if (Array.isArray(value)) {
      return renderArray(value, depth, parentKey, inline);
    }
    if (isPlainObject2(value)) {
      return renderObject(value, depth, parentKey, inline);
    }
    return /* @__PURE__ */ jsx("pre", { className: "px-3 py-2 text-xs bg-white rounded-md border shadow-inner border-border/30 text-muted-foreground shadow-foreground/5 dark:bg-slate-900", children: stringifyValue(value) });
  }
  return /* @__PURE__ */ jsx("div", { className: cn("space-y-4", className), children: renderValue(displayData, 0, "root") });
}
var getDataType = (value) => {
  if (value === null) return "null";
  if (value === void 0) return "undefined";
  if (typeof value === "string") {
    return value.startsWith("<") && value.includes(">") ? "HTML" : "Text";
  }
  if (Array.isArray(value)) return "Array";
  if (typeof value === "object") return "Object";
  return typeof value;
};
var sanitizeFileName = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "").concat(".txt");
var normalizeActionKey = (value) => value ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
var ACTION_ICON_MAP = {
  modifier: Pencil,
  edit: Pencil,
  update: Pencil,
  "mise a jour": Pencil,
  maj: Pencil,
  supprimer: Trash2,
  delete: Trash2,
  remove: Trash2,
  retirer: Trash2,
  destroy: Trash2,
  effacer: Trash2,
  partager: Share2,
  share: Share2,
  envoyer: Share2,
  telecharger: Download,
  download: Download,
  exporter: Download,
  voir: Eye,
  afficher: Eye,
  visualiser: Eye,
  preview: Eye,
  annuler: XCircle,
  cancel: XCircle,
  retour: XCircle,
  back: XCircle,
  confirmer: CheckCircle,
  valider: CheckCircle,
  confirm: CheckCircle,
  validate: CheckCircle
};
var DANGER_KEYWORDS = [
  "supprimer",
  "delete",
  "remove",
  "retirer",
  "destroy",
  "effacer",
  "annuler",
  "cancel",
  "retour",
  "abort",
  "stop"
];
var SUCCESS_KEYWORDS = [
  "confirmer",
  "valider",
  "confirm",
  "validate",
  "approve",
  "approuver"
];
var DEFAULT_ACTION_VARIANT = "blue";
var findIconByKeyword = (key) => {
  if (!key) return void 0;
  if (ACTION_ICON_MAP[key]) return ACTION_ICON_MAP[key];
  const entry = Object.entries(ACTION_ICON_MAP).find(
    ([keyword]) => key.includes(keyword)
  );
  return entry?.[1];
};
function getDefaultEyeDevMode() {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    return "development";
  }
  return "production";
}
function ShareablePreview({
  data,
  title,
  description,
  actions = [],
  shareUrl,
  className,
  maxHeight = "500px",
  mode = "debug",
  expandByDefault = true,
  trigger,
  triggerLabel,
  triggerClassName,
  defaultOpen = false,
  onOpenChange,
  eyeDevMode = getDefaultEyeDevMode(),
  customView,
  customViewProps = {},
  customViews,
  inline = false,
  labels: labelsOverride = {},
  onNotify
}) {
  const mergedLabels = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labelsOverride }),
    [labelsOverride]
  );
  const t = (key) => mergedLabels[key] ?? key;
  const notify = (type, key) => {
    if (onNotify) {
      onNotify(type, key);
    }
  };
  const [isExpanded, setIsExpanded] = useState(expandByDefault);
  const [currentMode, setCurrentMode] = useState(mode);
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpen);
  const hasCustomViews = customViews && customViews.length > 0;
  const firstViewId = customViews?.[0]?.id;
  const [activeViewId, setActiveViewId] = useState(firstViewId ?? "");
  useEffect(() => {
    if (hasCustomViews && firstViewId) setActiveViewId(firstViewId);
  }, [hasCustomViews, firstViewId]);
  const effectiveActions = useMemo(() => {
    const list = hasCustomViews && customViews.find((vc) => vc.id === activeViewId)?.actions?.length ? customViews.find((vc) => vc.id === activeViewId).actions : actions;
    return [...list].sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999)
    );
  }, [hasCustomViews, customViews, activeViewId, actions]);
  useEffect(() => {
    setIsExpanded(expandByDefault);
  }, [expandByDefault]);
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);
  useEffect(() => {
    setIsDialogOpen(defaultOpen);
  }, [defaultOpen]);
  useEffect(() => {
    if (!isDialogOpen && !inline) {
      setIsExpanded(expandByDefault);
      setCurrentMode(mode);
    }
  }, [expandByDefault, isDialogOpen, mode, inline]);
  const formatData = useMemo(
    () => (value) => {
      if (value === null || value === void 0) {
        return String(value);
      }
      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);
          return JSON.stringify(parsed, null, 2);
        } catch {
          return value;
        }
      }
      if (typeof value === "object") {
        try {
          return JSON.stringify(value, null, 2);
        } catch {
          return String(value);
        }
      }
      return String(value);
    },
    []
  );
  const dataType = useMemo(() => getDataType(data), [data]);
  const dataTypeLabel = useMemo(() => {
    const labels = {
      Array: t("shareablePreviewDataTypeArray"),
      Object: t("shareablePreviewDataTypeObject"),
      HTML: t("shareablePreviewDataTypeHtml"),
      Text: t("shareablePreviewDataTypeText"),
      string: t("shareablePreviewDataTypeString"),
      number: t("shareablePreviewDataTypeNumber"),
      boolean: t("shareablePreviewDataTypeBoolean"),
      undefined: t("shareablePreviewDataTypeUndefined"),
      function: t("shareablePreviewDataTypeFunction"),
      symbol: t("shareablePreviewDataTypeSymbol"),
      bigint: t("shareablePreviewDataTypeBigint")
    };
    return labels[dataType] ?? dataType;
  }, [dataType, t]);
  const handleDialogOpenChange = (nextOpen) => {
    setIsDialogOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };
  const handleCopy = async () => {
    if (!("clipboard" in navigator) || !navigator.clipboard?.writeText) {
      notify("error", "shareablePreviewClipboardUnsupported");
      return;
    }
    try {
      const textToCopy = formatData(data);
      await navigator.clipboard.writeText(textToCopy);
      notify("success", "shareablePreviewCopySuccess");
    } catch {
      notify("error", "shareablePreviewClipboardError");
    }
  };
  const handleShare = async () => {
    if (!("clipboard" in navigator) || !navigator.clipboard?.writeText) {
      notify("error", "shareablePreviewClipboardUnsupported");
      return;
    }
    try {
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        notify("success", "shareablePreviewShareLinkCopied");
      } else {
        notify("error", "shareablePreviewShareUnavailable");
      }
    } catch {
      notify("error", "shareablePreviewClipboardError");
    }
  };
  const handleDownload = () => {
    const content = formatData(data);
    if (typeof document === "undefined") {
      notify("error", "shareablePreviewDownloadUnavailable");
      return;
    }
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
    );
    element.setAttribute(
      "download",
      sanitizeFileName(
        title && title.trim().length > 0 ? title : t("shareablePreviewDefaultTitle")
      )
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    notify("success", "shareablePreviewDownloadSuccess");
  };
  const computedTitle = title && title.trim().length > 0 ? title : t("shareablePreviewDefaultTitle");
  const dialogTrigger = trigger ?? /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      className: cn(
        "flex items-center gap-2 rounded-full border-primary/40 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-background",
        triggerClassName
      ),
      children: [
        /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: triggerLabel ?? t("shareablePreviewOpen") })
      ]
    }
  );
  const shouldShowTrigger = trigger !== void 0 || !onOpenChange && !defaultOpen;
  const userViewLabels = {
    yes: mergedLabels.yes,
    no: mergedLabels.no,
    shareablePreviewEmptyList: mergedLabels.shareablePreviewEmptyList,
    shareablePreviewEmptyObject: mergedLabels.shareablePreviewEmptyObject,
    shareablePreviewNoValue: mergedLabels.shareablePreviewNoValue,
    shareablePreviewItemLabel: mergedLabels.shareablePreviewItemLabel,
    shareablePreviewEntriesCount: mergedLabels.shareablePreviewEntriesCount,
    shareablePreviewArrayLabel: mergedLabels.shareablePreviewArrayLabel,
    shareablePreviewNestedObjectLabel: mergedLabels.shareablePreviewNestedObjectLabel
  };
  const previewContent = /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "flex overflow-hidden flex-col border shadow-2xl transition-shadow max-h-[90vh] border-border/70 bg-slate-50 shadow-foreground/10 dark:bg-slate-900",
        className,
        inline && "shadow-sm max-h-none h-full"
      ),
      children: [
        /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-b border-border/50 bg-slate-100 sm:px-6 sm:py-4 dark:bg-slate-900/90", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 justify-between items-start sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold truncate text-foreground", children: computedTitle }),
              eyeDevMode === "development" && /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap rounded-full bg-primary/20 px-2 py-0.5 text-xs font-mono text-primary", children: dataTypeLabel }),
              eyeDevMode === "development" && /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-mono font-medium",
                    currentMode === "debug" ? "bg-orange-500/20 text-orange-600" : "bg-blue-500/20 text-blue-600"
                  ),
                  children: currentMode === "debug" ? t("shareablePreviewDebugMode") : t("shareablePreviewUserMode")
                }
              )
            ] }),
            description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground sm:text-sm", children: description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
            eyeDevMode === "development" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setCurrentMode(currentMode === "debug" ? "user" : "debug"),
                  title: currentMode === "debug" ? t("shareablePreviewSwitchToUser") : t("shareablePreviewSwitchToDebug"),
                  className: cn(
                    currentMode === "debug" ? "text-orange-600" : "text-blue-600"
                  ),
                  children: currentMode === "debug" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Bug, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { className: "hidden ml-1 text-xs sm:inline", children: t("shareablePreviewDebugMode") })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { className: "hidden ml-1 text-xs sm:inline", children: t("shareablePreviewUserMode") })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleCopy,
                  title: t("shareablePreviewCopyData"),
                  children: /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" })
                }
              )
            ] }),
            shareUrl && /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: handleShare,
                title: t("shareablePreviewCopyShareLink"),
                children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4" })
              }
            ),
            eyeDevMode === "development" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: handleDownload,
                  title: t("shareablePreviewDownloadData"),
                  children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  onClick: () => setIsExpanded((prev) => !prev),
                  className: "ml-auto sm:ml-0",
                  title: isExpanded ? t("shareablePreviewCollapseContent") : t("shareablePreviewExpandContent"),
                  children: isExpanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" })
                }
              )
            ] })
          ] })
        ] }) }),
        isExpanded && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "overflow-auto flex-1 p-4 bg-slate-50 sm:p-6 dark:bg-slate-900",
            style: { maxHeight: inline ? void 0 : maxHeight },
            children: [
              /* @__PURE__ */ jsx("div", { className: cn(currentMode === "debug" ? "block" : "hidden"), children: /* @__PURE__ */ jsx(
                DebugView,
                {
                  data,
                  className: "overflow-visible p-0 text-xs bg-transparent border-none",
                  maxDepthLabel: mergedLabels.shareablePreviewMaxDepth
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: cn(currentMode === "user" ? "block" : "hidden"), children: hasCustomViews ? /* @__PURE__ */ jsxs(
                Tabs,
                {
                  value: activeViewId,
                  onValueChange: setActiveViewId,
                  className: "w-full",
                  children: [
                    /* @__PURE__ */ jsx(TabsList, { className: "mb-4 w-full justify-start overflow-x-auto", children: customViews.map((vc) => /* @__PURE__ */ jsx(TabsTrigger, { value: vc.id, children: vc.label }, vc.id)) }),
                    customViews.map((vc) => /* @__PURE__ */ jsx(TabsContent, { value: vc.id, className: "mt-0", children: React5__default.createElement(vc.view, {
                      data,
                      expandByDefault,
                      ...vc.viewProps
                    }) }, vc.id))
                  ]
                }
              ) : customView ? React5__default.createElement(customView, {
                data,
                expandByDefault,
                ...customViewProps
              }) : /* @__PURE__ */ jsx(
                UserView,
                {
                  data,
                  expandByDefault,
                  labels: userViewLabels,
                  ...customViewProps
                }
              ) })
            ]
          }
        ),
        effectiveActions.length > 0 && /* @__PURE__ */ jsx("div", { className: "px-4 py-3 border-t border-border/50 bg-slate-100 sm:px-6 dark:bg-slate-900/90", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: effectiveActions.map((action, idx) => {
          const {
            label,
            icon,
            onClick,
            variant,
            withPulse,
            withIndicator,
            buttonClassName,
            disabled
          } = action;
          const normalizedLabel = normalizeActionKey(label);
          const normalizedIconHint = typeof icon === "string" ? normalizeActionKey(icon) : "";
          const isDangerAction = DANGER_KEYWORDS.some(
            (keyword) => normalizedLabel.includes(keyword) || normalizedIconHint.includes(keyword)
          );
          const isSuccessAction = SUCCESS_KEYWORDS.some(
            (keyword) => normalizedLabel.includes(keyword) || normalizedIconHint.includes(keyword)
          );
          const resolvedVariant = variant ?? (isDangerAction ? "red" : isSuccessAction ? "green" : DEFAULT_ACTION_VARIANT);
          let resolvedIcon;
          if (typeof icon === "function") {
            resolvedIcon = icon;
          } else if (React5__default.isValidElement(icon)) {
            const elementWithClassName = icon;
            resolvedIcon = ({ className: cls }) => React5__default.cloneElement(elementWithClassName, {
              className: cn(
                "w-4 h-4",
                cls,
                elementWithClassName.props.className
              )
            });
          } else {
            resolvedIcon = findIconByKeyword(normalizedIconHint) ?? findIconByKeyword(normalizedLabel);
          }
          return /* @__PURE__ */ jsx(
            ValidationButton,
            {
              onClick,
              disabled,
              icon: resolvedIcon,
              variant: resolvedVariant,
              withPulse: withPulse ?? false,
              withIndicator: withIndicator ?? false,
              className: cn(
                "justify-center px-5 py-2 text-sm font-semibold tracking-wide uppercase min-w-[150px]",
                buttonClassName,
                isDangerAction ? "shadow-red-400/30" : isSuccessAction ? "shadow-green-400/30" : "shadow-primary/20"
              ),
              children: label
            },
            `${label}-${idx}`
          );
        }) }) })
      ]
    }
  );
  if (inline) {
    return previewContent;
  }
  return /* @__PURE__ */ jsxs(Dialog, { open: isDialogOpen, onOpenChange: handleDialogOpenChange, children: [
    shouldShowTrigger && /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: dialogTrigger }),
    /* @__PURE__ */ jsx(DialogContent, { className: "w-full max-w-[95vw] overflow-hidden border-none bg-transparent p-0 sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl", children: previewContent })
  ] });
}
function createPreviewActions(options) {
  const {
    onConfirm,
    onReject,
    onCancel,
    labels = {},
    withIndicatorOnConfirm = true,
    withPulseOnConfirm = false,
    order = "confirm-first"
  } = options;
  const confirmLabel = labels.confirm ?? "Confirmer";
  const rejectLabel = labels.reject ?? "Rejeter";
  const cancelLabel = labels.cancel ?? "Annuler";
  const base = order === "cancel-first" ? { cancel: 0, confirm: 1, reject: 2 } : { confirm: 1, reject: 2, cancel: 3 };
  const confirmAction = {
    label: confirmLabel,
    icon: CheckCircle,
    variant: "green",
    onClick: onConfirm,
    withIndicator: withIndicatorOnConfirm,
    withPulse: withPulseOnConfirm,
    order: base.confirm
  };
  const rejectAction = onReject ? {
    label: rejectLabel,
    icon: XCircle,
    variant: "red",
    onClick: onReject,
    order: base.reject
  } : null;
  const cancelAction = onCancel ? {
    label: cancelLabel,
    icon: XCircle,
    variant: "blue",
    onClick: onCancel,
    order: base.cancel
  } : null;
  return [confirmAction, rejectAction, cancelAction].filter(
    (a) => a !== null
  );
}

export { DEFAULT_LABELS, DataTreeNode, DebugView, ShareablePreview, UserView, createPreviewActions, filterDataByKeys };
