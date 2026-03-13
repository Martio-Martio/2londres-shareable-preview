"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import type { ValidationButtonProps } from "./components/ValidationButton";
import { ValidationButton } from "./components/ValidationButton";
import { cn } from "./utils/cn";
import {
  Bug,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Code,
  Copy,
  Download,
  Eye,
  Pencil,
  Share2,
  Trash2,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { DebugView } from "./components/DebugView";
import { UserView } from "./components/UserView";
import { DEFAULT_LABELS } from "./i18n/defaultLabels";
import type { UserViewLabels } from "./components/UserView";
import type { FilterKeysOptions } from "./utils/filterDataByKeys";

export type ShareablePreviewAction = {
  label: string;
  icon?:
    | string
    | React.ComponentType<{ className?: string }>
    | React.ReactElement;
  onClick: () => void;
  variant?: ValidationButtonProps["variant"];
  withPulse?: boolean;
  withIndicator?: boolean;
  buttonClassName?: string;
  disabled?: boolean;
  /** Ordre d'affichage (plus petit = à gauche) */
  order?: number;
};

export interface CustomViewFieldConfig extends FilterKeysOptions {
  [key: string]: unknown;
}

export interface CustomViewConfig {
  id: string;
  label: string;
  view: React.ComponentType<{
    data: unknown;
    className?: string;
    expandByDefault?: boolean;
    excludedKeys?: string[];
    excludedNestedKeys?: string[];
    includedKeys?: string[];
    includedNestedKeys?: string[];
    maxDepth?: number;
    [key: string]: unknown;
  }>;
  viewProps?: CustomViewFieldConfig;
  /** Boutons spécifiques à cette vue (priment sur les actions globales) */
  actions?: ShareablePreviewAction[];
}

export interface ShareablePreviewProps {
  data: unknown;
  title?: string;
  description?: string;
  actions?: ShareablePreviewAction[];
  shareUrl?: string;
  className?: string;
  maxHeight?: string;
  mode?: "debug" | "user";
  expandByDefault?: boolean;
  trigger?: React.ReactElement;
  triggerLabel?: string;
  triggerClassName?: string;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  eyeDevMode?: "development" | "production";
  /** Vue personnalisée unique (rétrocompatibilité) */
  customView?: React.ComponentType<{
    data: unknown;
    className?: string;
    expandByDefault?: boolean;
    excludedKeys?: string[];
    excludedNestedKeys?: string[];
    includedKeys?: string[];
    includedNestedKeys?: string[];
    maxDepth?: number;
    [key: string]: unknown;
  }>;
  customViewProps?: CustomViewFieldConfig;
  /** Liste de vues personnalisées avec sélecteur (customViews prime sur customView) */
  customViews?: CustomViewConfig[];
  inline?: boolean;
  labels?: Partial<Record<string, string>>;
  onNotify?: (type: "success" | "error", key: string) => void;
}

const getDataType = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "string") {
    return value.startsWith("<") && value.includes(">") ? "HTML" : "Text";
  }
  if (Array.isArray(value)) return "Array";
  if (typeof value === "object") return "Object";
  return typeof value;
};

const sanitizeFileName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .concat(".txt");

const normalizeActionKey = (value?: string) =>
  value
    ? value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
    : "";

const ACTION_ICON_MAP: Record<string, LucideIcon> = {
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
  validate: CheckCircle,
};

const DANGER_KEYWORDS = [
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
  "stop",
];

const SUCCESS_KEYWORDS = [
  "confirmer",
  "valider",
  "confirm",
  "validate",
  "approve",
  "approuver",
];

const DEFAULT_ACTION_VARIANT: ValidationButtonProps["variant"] = "blue";

const findIconByKeyword = (key: string): LucideIcon | undefined => {
  if (!key) return undefined;
  if (ACTION_ICON_MAP[key]) return ACTION_ICON_MAP[key];
  const entry = Object.entries(ACTION_ICON_MAP).find(([keyword]) =>
    key.includes(keyword)
  );
  return entry?.[1];
};

function getDefaultEyeDevMode(): "development" | "production" {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "development") {
    return "development";
  }
  return "production";
}

export function ShareablePreview({
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
  onNotify,
}: ShareablePreviewProps) {
  const mergedLabels = useMemo(
    () => ({ ...DEFAULT_LABELS, ...labelsOverride }),
    [labelsOverride]
  );

  const t = (key: string) => mergedLabels[key] ?? key;

  const notify = (type: "success" | "error", key: string) => {
    if (onNotify) {
      onNotify(type, key);
    }
  };

  const [isExpanded, setIsExpanded] = useState(expandByDefault);
  const [currentMode, setCurrentMode] = useState<"debug" | "user">(mode);
  const [isDialogOpen, setIsDialogOpen] = useState(defaultOpen);

  const hasCustomViews = customViews && customViews.length > 0;
  const firstViewId = customViews?.[0]?.id;
  const [activeViewId, setActiveViewId] = useState(firstViewId ?? "");

  useEffect(() => {
    if (hasCustomViews && firstViewId) setActiveViewId(firstViewId);
  }, [hasCustomViews, firstViewId]);

  const effectiveActions = useMemo(() => {
    const list =
      hasCustomViews &&
      customViews!.find((vc) => vc.id === activeViewId)?.actions?.length
        ? customViews!.find((vc) => vc.id === activeViewId)!.actions!
        : actions;
    return [...list].sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999)
    ) as ShareablePreviewAction[];
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
    () =>
      (value: unknown): string => {
        if (value === null || value === undefined) {
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
    const labels: Record<string, string> = {
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
      bigint: t("shareablePreviewDataTypeBigint"),
    };

    return labels[dataType] ?? dataType;
  }, [dataType, t]);

  const handleDialogOpenChange = (nextOpen: boolean) => {
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
        title && title.trim().length > 0
          ? title
          : t("shareablePreviewDefaultTitle")
      )
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    notify("success", "shareablePreviewDownloadSuccess");
  };

  const computedTitle =
    title && title.trim().length > 0
      ? title
      : t("shareablePreviewDefaultTitle");

  const dialogTrigger = trigger ?? (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center gap-2 rounded-full border-primary/40 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-background",
        triggerClassName
      )}
    >
      <Eye className="w-4 h-4" />
      <span>{triggerLabel ?? t("shareablePreviewOpen")}</span>
    </Button>
  );

  const shouldShowTrigger =
    trigger !== undefined || (!onOpenChange && !defaultOpen);

  const userViewLabels: UserViewLabels = {
    yes: mergedLabels.yes,
    no: mergedLabels.no,
    shareablePreviewEmptyList: mergedLabels.shareablePreviewEmptyList,
    shareablePreviewEmptyObject: mergedLabels.shareablePreviewEmptyObject,
    shareablePreviewNoValue: mergedLabels.shareablePreviewNoValue,
    shareablePreviewItemLabel: mergedLabels.shareablePreviewItemLabel,
    shareablePreviewEntriesCount: mergedLabels.shareablePreviewEntriesCount,
    shareablePreviewArrayLabel: mergedLabels.shareablePreviewArrayLabel,
    shareablePreviewNestedObjectLabel:
      mergedLabels.shareablePreviewNestedObjectLabel,
  };

  const previewContent = (
    <Card
      className={cn(
        "flex overflow-hidden flex-col border shadow-2xl transition-shadow max-h-[90vh] border-border/70 bg-slate-50 shadow-foreground/10 dark:bg-slate-900",
        className,
        inline && "shadow-sm max-h-none h-full"
      )}
    >
      <div className="px-4 py-3 border-b border-border/50 bg-slate-100 sm:px-6 sm:py-4 dark:bg-slate-900/90">
        <div className="flex flex-col gap-3 justify-between items-start sm:flex-row sm:items-center">
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-semibold truncate text-foreground">
                {computedTitle}
              </h3>
              {eyeDevMode === "development" && (
                <span className="whitespace-nowrap rounded-full bg-primary/20 px-2 py-0.5 text-xs font-mono text-primary">
                  {dataTypeLabel}
                </span>
              )}
              {eyeDevMode === "development" && (
                <span
                  className={cn(
                    "whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-mono font-medium",
                    currentMode === "debug"
                      ? "bg-orange-500/20 text-orange-600"
                      : "bg-blue-500/20 text-blue-600"
                  )}
                >
                  {currentMode === "debug"
                    ? t("shareablePreviewDebugMode")
                    : t("shareablePreviewUserMode")}
                </span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {description}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {eyeDevMode === "development" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setCurrentMode(currentMode === "debug" ? "user" : "debug")
                  }
                  title={
                    currentMode === "debug"
                      ? t("shareablePreviewSwitchToUser")
                      : t("shareablePreviewSwitchToDebug")
                  }
                  className={cn(
                    currentMode === "debug"
                      ? "text-orange-600"
                      : "text-blue-600"
                  )}
                >
                  {currentMode === "debug" ? (
                    <>
                      <Bug className="w-4 h-4" />
                      <span className="hidden ml-1 text-xs sm:inline">
                        {t("shareablePreviewDebugMode")}
                      </span>
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4" />
                      <span className="hidden ml-1 text-xs sm:inline">
                        {t("shareablePreviewUserMode")}
                      </span>
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  title={t("shareablePreviewCopyData")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </>
            )}

            {shareUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                title={t("shareablePreviewCopyShareLink")}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}

            {eyeDevMode === "development" && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  title={t("shareablePreviewDownloadData")}
                >
                  <Download className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="ml-auto sm:ml-0"
                  title={
                    isExpanded
                      ? t("shareablePreviewCollapseContent")
                      : t("shareablePreviewExpandContent")
                  }
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="overflow-auto flex-1 p-4 bg-slate-50 sm:p-6 dark:bg-slate-900"
          style={{ maxHeight: inline ? undefined : maxHeight }}
        >
          <div className={cn(currentMode === "debug" ? "block" : "hidden")}>
            <DebugView
              data={data}
              className="overflow-visible p-0 text-xs bg-transparent border-none"
              maxDepthLabel={mergedLabels.shareablePreviewMaxDepth}
            />
          </div>
          <div className={cn(currentMode === "user" ? "block" : "hidden")}>
            {hasCustomViews ? (
              <Tabs
                value={activeViewId}
                onValueChange={setActiveViewId}
                className="w-full"
              >
                <TabsList className="mb-4 w-full justify-start overflow-x-auto">
                  {customViews!.map((vc) => (
                    <TabsTrigger key={vc.id} value={vc.id}>
                      {vc.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {customViews!.map((vc) => (
                  <TabsContent key={vc.id} value={vc.id} className="mt-0">
                    {React.createElement(vc.view, {
                      data,
                      expandByDefault,
                      ...vc.viewProps,
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            ) : customView ? (
              React.createElement(customView, {
                data,
                expandByDefault,
                ...customViewProps,
              })
            ) : (
              <UserView
                data={data}
                expandByDefault={expandByDefault}
                labels={userViewLabels}
                {...customViewProps}
              />
            )}
          </div>
        </div>
      )}

      {effectiveActions.length > 0 && (
        <div className="px-4 py-3 border-t border-border/50 bg-slate-100 sm:px-6 dark:bg-slate-900/90">
          <div className="flex flex-wrap gap-3">
            {effectiveActions.map((action, idx) => {
              const {
                label,
                icon,
                onClick,
                variant,
                withPulse,
                withIndicator,
                buttonClassName,
                disabled,
              } = action;

              const normalizedLabel = normalizeActionKey(label);
              const normalizedIconHint =
                typeof icon === "string" ? normalizeActionKey(icon) : "";

              const isDangerAction = DANGER_KEYWORDS.some(
                (keyword) =>
                  normalizedLabel.includes(keyword) ||
                  normalizedIconHint.includes(keyword)
              );

              const isSuccessAction = SUCCESS_KEYWORDS.some(
                (keyword) =>
                  normalizedLabel.includes(keyword) ||
                  normalizedIconHint.includes(keyword)
              );

              const resolvedVariant =
                variant ??
                (isDangerAction
                  ? "red"
                  : isSuccessAction
                    ? "green"
                    : DEFAULT_ACTION_VARIANT);

              let resolvedIcon:
                | React.ComponentType<{ className?: string }>
                | undefined;

              if (typeof icon === "function") {
                resolvedIcon = icon;
              } else if (React.isValidElement(icon)) {
                const elementWithClassName = icon as React.ReactElement<{
                  className?: string;
                }>;
                resolvedIcon = ({ className: cls }: { className?: string }) =>
                  React.cloneElement(elementWithClassName, {
                    className: cn(
                      "w-4 h-4",
                      cls,
                      elementWithClassName.props.className
                    ),
                  });
              } else {
                resolvedIcon =
                  findIconByKeyword(normalizedIconHint) ??
                  findIconByKeyword(normalizedLabel);
              }

              return (
                <ValidationButton
                  key={`${label}-${idx}`}
                  onClick={onClick}
                  disabled={disabled}
                  icon={resolvedIcon}
                  variant={resolvedVariant}
                  withPulse={withPulse ?? false}
                  withIndicator={withIndicator ?? false}
                  className={cn(
                    "justify-center px-5 py-2 text-sm font-semibold tracking-wide uppercase min-w-[150px]",
                    buttonClassName,
                    isDangerAction
                      ? "shadow-red-400/30"
                      : isSuccessAction
                        ? "shadow-green-400/30"
                        : "shadow-primary/20"
                  )}
                >
                  {label}
                </ValidationButton>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );

  if (inline) {
    return previewContent;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      {shouldShowTrigger && (
        <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      )}
      <DialogContent className="w-full max-w-[95vw] overflow-hidden border-none bg-transparent p-0 sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        {previewContent}
      </DialogContent>
    </Dialog>
  );
}
