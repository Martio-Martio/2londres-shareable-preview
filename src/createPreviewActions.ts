import { CheckCircle, XCircle } from "lucide-react";
import type { ShareablePreviewAction } from "./ShareablePreview";

/** Options pour créer des boutons type approbation/confirmation */
export interface CreatePreviewActionsOptions {
  onConfirm: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  labels?: {
    confirm?: string;
    reject?: string;
    cancel?: string;
  };
  withIndicatorOnConfirm?: boolean;
  withPulseOnConfirm?: boolean;
  order?: "confirm-first" | "cancel-first";
}

/** Helper pour créer les boutons super (ValidationButton) type transaction/approbation */
export function createPreviewActions(
  options: CreatePreviewActionsOptions
): ShareablePreviewAction[] {
  const {
    onConfirm,
    onReject,
    onCancel,
    labels = {},
    withIndicatorOnConfirm = true,
    withPulseOnConfirm = false,
    order = "confirm-first",
  } = options;

  const confirmLabel = labels.confirm ?? "Confirmer";
  const rejectLabel = labels.reject ?? "Rejeter";
  const cancelLabel = labels.cancel ?? "Annuler";

  const base =
    order === "cancel-first"
      ? { cancel: 0, confirm: 1, reject: 2 }
      : { confirm: 1, reject: 2, cancel: 3 };

  const confirmAction: ShareablePreviewAction = {
    label: confirmLabel,
    icon: CheckCircle,
    variant: "green",
    onClick: onConfirm,
    withIndicator: withIndicatorOnConfirm,
    withPulse: withPulseOnConfirm,
    order: base.confirm,
  };

  const rejectAction: ShareablePreviewAction | null = onReject
    ? {
        label: rejectLabel,
        icon: XCircle,
        variant: "red",
        onClick: onReject,
        order: base.reject,
      }
    : null;

  const cancelAction: ShareablePreviewAction | null = onCancel
    ? {
        label: cancelLabel,
        icon: XCircle,
        variant: "blue",
        onClick: onCancel,
        order: base.cancel,
      }
    : null;

  return [confirmAction, rejectAction, cancelAction].filter(
    (a): a is ShareablePreviewAction => a !== null
  );
}
