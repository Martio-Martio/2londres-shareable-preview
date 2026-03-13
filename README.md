# @2londres/shareable-preview

React component for shareable data preview with debug/user modes, custom views, field filtering, and validation buttons.

## Installation

```bash
pnpm add @2londres/shareable-preview
# or
npm install @2londres/shareable-preview
```

## Peer dependencies

- `react` >= 18.0.0
- `react-dom` >= 18.0.0

Your project must have Tailwind CSS configured (the component uses Tailwind classes).

## Basic usage

```tsx
import { ShareablePreview } from "@2londres/shareable-preview";

<ShareablePreview
  data={{ foo: "bar", count: 42 }}
  title="My Preview"
  description="Verify the information before validation"
  mode="user"
/>
```

With actions:

```tsx
<ShareablePreview
  data={myData}
  title="Preview"
  actions={[
    { label: "Confirm", onClick: () => {} },
    { label: "Delete", onClick: () => {} },
  ]}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `unknown` | Data to preview |
| `title` | `string` | Preview title |
| `description` | `string` | Optional description |
| `actions` | `ShareablePreviewAction[]` | Action buttons |
| `shareUrl` | `string` | URL to copy when sharing |
| `labels` | `Partial<Record<string, string>>` | Override default labels (i18n) |
| `onNotify` | `(type: 'success' \| 'error', key: string) => void` | Callback for notifications (copy, download, etc.) |
| `eyeDevMode` | `'development' \| 'production'` | Show/hide debug UI (default: `process.env.NODE_ENV`) |
| `mode` | `'debug' \| 'user'` | Default view mode |
| `inline` | `boolean` | Render inline without dialog |
| `customView` | `Component` | Single custom view component |
| `customViewProps` | `object` | Props passed to custom view (including field filters) |
| `customViews` | `Array` | Multiple views with tabs (id, label, view, viewProps, actions) |
| `defaultOpen` | `boolean` | Open dialog by default |
| `onOpenChange` | `(open: boolean) => void` | Callback when dialog open state changes |

## Action buttons (ValidationButton)

Actions display as gradient buttons with icons and visual effects at the bottom of the preview.

### Action props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Button text |
| `onClick` | `() => void` | Click handler |
| `variant` | `"green" \| "red" \| "blue" \| "purple" \| "orange"` | Gradient color (auto-detected if absent) |
| `icon` | `LucideIcon \| string \| ReactElement` | Icon (auto-detected from label if absent) |
| `withPulse` | `boolean` | Pulse animation to draw attention |
| `withIndicator` | `boolean` | Animated yellow dot in top-right corner |
| `buttonClassName` | `string` | Additional CSS classes |
| `disabled` | `boolean` | Disable button |
| `order` | `number` | Display order (lower = left) |

### Auto-detection

- **Red variant**: labels containing "delete", "cancel", "reject", etc.
- **Green variant**: "confirm", "validate", "approve", etc.
- **Icon**: inferred from label (confirm → CheckCircle, cancel → XCircle, etc.)

### Example — Transaction approval

```tsx
<ShareablePreview
  data={previewData}
  title="Preview"
  mode="user"
  customView={MultipleTransactionsView}
  defaultOpen
  onOpenChange={(open) => !open && setShowPreview(false)}
  actions={[
    { label: "Confirm", onClick: () => { setIsOpen(true); setShowPreview(false); }, variant: "green", withIndicator: true },
    { label: "Reject", onClick: () => { setIsRejectOpen(true); setShowPreview(false); }, variant: "red" },
    { label: "Cancel", onClick: () => setShowPreview(false), variant: "blue", order: 0 },
  ]}
/>
```

## Custom views

### Single view (`customView`)

```tsx
<ShareablePreview
  data={data}
  customView={TransactionView}
  customViewProps={{
    excludedKeys: ["id", "host_id"],
    excludedNestedKeys: ["transaction_rule", "country"],
    maxDepth: 7,
  }}
/>
```

### Multiple views with tabs (`customViews`)

```tsx
import { ShareablePreview, UserView } from "@2londres/shareable-preview";

<ShareablePreview
  data={data}
  customViews={[
    {
      id: "summary",
      label: "Summary",
      view: UserView,
      viewProps: { includedKeys: ["amount", "currency", "reference"] },
      actions: [
        { label: "Validate", variant: "green", onClick: handleValidate },
        { label: "Cancel", variant: "red", onClick: handleCancel },
      ],
    },
    {
      id: "full",
      label: "Full details",
      view: TransactionView,
      viewProps: { excludedKeys: ["id"], maxDepth: 7 },
      actions: [
        { label: "Confirm", variant: "green", onClick: handleConfirm },
        { label: "Reject", variant: "red", onClick: handleReject },
      ],
    },
  ]}
/>
```

Each tab can have its **own actions**. If a view has no `actions`, the global actions are used.

## Field filtering

Options passed via `customViewProps` or `viewProps` (in `customViews`). Compatible with `UserView`.

| Option | Type | Description |
|--------|------|-------------|
| `includedKeys` | `string[]` | **Whitelist**: only these top-level keys |
| `excludedKeys` | `string[]` | **Blacklist**: exclude these keys |
| `includedNestedKeys` | `string[]` | Whitelist for nested paths |
| `excludedNestedKeys` | `string[]` | Blacklist for nested paths |
| `maxDepth` | `number` | Maximum recursion depth |

## Helper `createPreviewActions`

```tsx
import { createPreviewActions, ShareablePreview } from "@2londres/shareable-preview";

const actions = createPreviewActions({
  onConfirm: () => { setIsOpen(true); setShowPreview(false); },
  onReject: () => { setIsRejectOpen(true); setShowPreview(false); },
  onCancel: () => setShowPreview(false),
  labels: { confirm: "Confirm", reject: "Reject", cancel: "Cancel" },
  withIndicatorOnConfirm: true,
});

<ShareablePreview data={previewData} actions={actions} mode="user" />
```

## Internationalization

The package uses `labels` and `onNotify` for i18n without depending on react-i18next:

```tsx
<ShareablePreview
  data={data}
  labels={{
    shareablePreviewDefaultTitle: "Preview",
    shareablePreviewOpen: "Open preview",
  }}
  onNotify={(type, key) => {
    if (type === "success") toast.success(key);
    else toast.error(key);
  }}
/>
```

### With react-i18next

```tsx
import { useTranslation } from "react-i18next";
import { ShareablePreview } from "@2londres/shareable-preview";

const keys = [
  "shareablePreviewCopySuccess",
  "shareablePreviewShareLinkCopied",
  "shareablePreviewClipboardError",
];

<ShareablePreview
  data={data}
  labels={Object.fromEntries(keys.map((k) => [k, t(k)]))}
  onNotify={(type, key) => {
    if (type === "success") notifSilence(key);
    else notifSilenceError(key);
  }}
/>
```

## Publishing to npm

```bash
pnpm build
npm publish --access public
```
