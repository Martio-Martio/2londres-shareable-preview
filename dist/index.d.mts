import * as react_jsx_runtime from 'react/jsx-runtime';
import React$1, { ButtonHTMLAttributes } from 'react';

interface ValidationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    withPulse?: boolean;
    withIndicator?: boolean;
    variant?: "green" | "blue" | "purple" | "orange" | "red";
    icon?: React.ComponentType<{
        className?: string;
    }>;
}

/**
 * Filtre un objet ou tableau de données selon les clés incluses/exclues.
 * - includedKeys / includedNestedKeys : whitelist (seules ces clés sont conservées)
 * - excludedKeys / excludedNestedKeys : blacklist (ces clés sont retirées)
 * La whitelist prime sur la blacklist si les deux sont fournies.
 */
interface FilterKeysOptions {
    includedKeys?: string[];
    excludedKeys?: string[];
    includedNestedKeys?: string[];
    excludedNestedKeys?: string[];
    maxDepth?: number;
}
/**
 * Filtre data selon les options de clés.
 * Retourne une copie filtrée sans modifier l'original.
 */
declare function filterDataByKeys<T>(data: T, options: FilterKeysOptions): T;

type ShareablePreviewAction = {
    label: string;
    icon?: string | React$1.ComponentType<{
        className?: string;
    }> | React$1.ReactElement;
    onClick: () => void;
    variant?: ValidationButtonProps["variant"];
    withPulse?: boolean;
    withIndicator?: boolean;
    buttonClassName?: string;
    disabled?: boolean;
    /** Ordre d'affichage (plus petit = à gauche) */
    order?: number;
};
interface CustomViewFieldConfig extends FilterKeysOptions {
    [key: string]: unknown;
}
interface CustomViewConfig {
    id: string;
    label: string;
    view: React$1.ComponentType<{
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
interface ShareablePreviewProps {
    data: unknown;
    title?: string;
    description?: string;
    actions?: ShareablePreviewAction[];
    shareUrl?: string;
    className?: string;
    maxHeight?: string;
    mode?: "debug" | "user";
    expandByDefault?: boolean;
    trigger?: React$1.ReactElement;
    triggerLabel?: string;
    triggerClassName?: string;
    defaultOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
    eyeDevMode?: "development" | "production";
    /** Vue personnalisée unique (rétrocompatibilité) */
    customView?: React$1.ComponentType<{
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
declare function ShareablePreview({ data, title, description, actions, shareUrl, className, maxHeight, mode, expandByDefault, trigger, triggerLabel, triggerClassName, defaultOpen, onOpenChange, eyeDevMode, customView, customViewProps, customViews, inline, labels: labelsOverride, onNotify, }: ShareablePreviewProps): react_jsx_runtime.JSX.Element;

/** Options pour créer des boutons type approbation/confirmation */
interface CreatePreviewActionsOptions {
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
declare function createPreviewActions(options: CreatePreviewActionsOptions): ShareablePreviewAction[];

interface UserViewLabels {
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
declare function UserView({ data, className, labels: labelsOverride, includedKeys, excludedKeys, includedNestedKeys, excludedNestedKeys, maxDepth, }: UserViewProps): react_jsx_runtime.JSX.Element;

interface DebugViewProps {
    data: unknown;
    className?: string;
    maxDepthLabel?: string;
}
declare function DebugView({ data, className, maxDepthLabel, }: DebugViewProps): react_jsx_runtime.JSX.Element;

interface DataTreeNodeProps {
    nodeKey: string;
    value: unknown;
    level?: number;
    maxLevel?: number;
    maxDepthLabel?: string;
}
declare function DataTreeNode({ nodeKey, value, level, maxLevel, maxDepthLabel, }: DataTreeNodeProps): react_jsx_runtime.JSX.Element;

declare const DEFAULT_LABELS: Record<string, string>;

export { type CreatePreviewActionsOptions, type CustomViewConfig, type CustomViewFieldConfig, DEFAULT_LABELS, DataTreeNode, DebugView, type FilterKeysOptions, ShareablePreview, type ShareablePreviewAction, type ShareablePreviewProps, UserView, type UserViewLabels, createPreviewActions, filterDataByKeys };
