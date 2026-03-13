export const DEFAULT_LABELS: Record<string, string> = {
  yes: "Yes",
  no: "No",
  shareablePreviewCopySuccess: "Data copied to the clipboard.",
  shareablePreviewShareLinkCopied: "The share link has been copied.",
  shareablePreviewShareUnavailable: "Sharing is unavailable for this preview.",
  shareablePreviewDownloadSuccess: "Data has been downloaded.",
  shareablePreviewClipboardError: "Unable to copy data, please try again.",
  shareablePreviewClipboardUnsupported:
    "Clipboard copy is not supported on this device.",
  shareablePreviewDownloadUnavailable:
    "Download is unavailable on this device.",
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
  shareablePreviewGeneralInfo: "General information",
};

export function interpolate(
  template: string,
  params: Record<string, string | number>
): string {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`{{${key}}}`, String(value)),
    template
  );
}
