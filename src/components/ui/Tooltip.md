# Tooltip Component Documentation

A lightweight tooltip component that displays additional information on hover. Features smart positioning and supports both simple text and complex React content.

## Features

- ✅ Four positioning options (top, bottom, left, right)
- ✅ Three sizes (sm, md, lg)
- ✅ Supports text and React content
- ✅ Instant show/hide on hover
- ✅ Keyboard accessible (focus/blur)
- ✅ Automatic text wrapping control
- ✅ TypeScript support
- ✅ Client-side component

## Basic Usage

```tsx
import { Tooltip } from "~/components/ui";

// Simple text tooltip
<Tooltip content="This is a helpful tip">
  <button>Hover me</button>
</Tooltip>

// With custom position
<Tooltip content="Appears above" position="top">
  <span>Hover for tooltip</span>
</Tooltip>
```

## Positioning

Control where the tooltip appears relative to the trigger:

```tsx
// Top (appears above the element)
<Tooltip content="Top tooltip" position="top">
  <button>Hover me</button>
</Tooltip>

// Bottom (default - appears below)
<Tooltip content="Bottom tooltip" position="bottom">
  <button>Hover me</button>
</Tooltip>

// Left (appears to the left)
<Tooltip content="Left tooltip" position="left">
  <button>Hover me</button>
</Tooltip>

// Right (appears to the right)
<Tooltip content="Right tooltip" position="right">
  <button>Hover me</button>
</Tooltip>
```

## Sizes

Three size options for different contexts:

```tsx
// Small - compact tooltip
<Tooltip content="Small tooltip" size="sm">
  <span>?</span>
</Tooltip>

// Medium (default) - standard size
<Tooltip content="Medium tooltip" size="md">
  <button>Info</button>
</Tooltip>

// Large - more padding for complex content
<Tooltip content="Large tooltip with more text" size="lg">
  <button>Details</button>
</Tooltip>
```

## Rich Content

Tooltips can contain any React content:

```tsx
// Formatted content
<Tooltip
  content={
    <div>
      <strong>Pro tip:</strong>
      <p>You can include formatted text, lists, and more.</p>
    </div>
  }
>
  <button>Advanced tooltip</button>
</Tooltip>

// With styling
<Tooltip
  content={
    <div className="max-w-xs">
      <h4 className="font-semibold mb-1">Keyboard Shortcut</h4>
      <p className="text-sm text-gray-600">
        Press <kbd>Cmd+K</kbd> to open search
      </p>
    </div>
  }
  size="lg"
>
  <button>Shortcuts</button>
</Tooltip>

// List content
<Tooltip
  content={
    <ul className="list-disc list-inside space-y-1">
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </ul>
  }
>
  <span className="underline">View options</span>
</Tooltip>
```

## Common Use Cases

### Form Field Help

```tsx
<div className="flex items-center gap-2">
  <label htmlFor="email">Email</label>
  <Tooltip content="We'll never share your email with anyone">
    <span className="text-gray-400 cursor-help">ℹ</span>
  </Tooltip>
</div>
<input id="email" type="email" />
```

### Icon Buttons

```tsx
<Tooltip content="Edit">
  <IconButton aria-label="Edit">
    ✏️
  </IconButton>
</Tooltip>

<Tooltip content="Delete item" position="top">
  <IconButton aria-label="Delete" variant="danger">
    🗑️
  </IconButton>
</Tooltip>
```

### Truncated Text

```tsx
<Tooltip content="This is the full text that was truncated">
  <p className="max-w-xs truncate">
    This is a very long text that will be truncated...
  </p>
</Tooltip>
```

### Status Indicators

```tsx
<Tooltip
  content={
    <div>
      <p className="font-medium">System Status</p>
      <p className="text-sm">All systems operational</p>
      <p className="text-xs text-gray-500">Last checked: 5 min ago</p>
    </div>
  }
  size="lg"
>
  <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
</Tooltip>
```

### Definitions

```tsx
<p>
  The{" "}
  <Tooltip content="Application Programming Interface">
    <span className="cursor-help underline decoration-dotted">API</span>
  </Tooltip>{" "}
  allows you to integrate with our service.
</p>
```

## API Reference

### Tooltip Props

| Prop      | Type                                     | Default    | Description                           |
| --------- | ---------------------------------------- | ---------- | ------------------------------------- |
| children  | `React.ReactNode`                        | required   | The element that triggers the tooltip |
| content   | `React.ReactNode`                        | required   | Content to display in the tooltip     |
| size      | `"sm" \| "md" \| "lg"`                   | `"md"`     | Size of the tooltip                   |
| position  | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Where to position the tooltip         |
| className | `string`                                 | -          | Additional CSS classes                |

## Styling Details

### Size Classes

- **sm**: `px-2 py-1 text-xs` - Compact size for small UI elements
- **md**: `px-3 py-2 text-sm` - Default size for most use cases
- **lg**: `px-4 py-3 text-base` - Larger size for detailed content

### Positioning

Uses Tailwind's positioning utilities:

- Absolute positioning relative to parent
- Transform utilities for perfect centering
- Automatic text wrapping control (no wrap for strings, custom for JSX)

### Visual Style

- White background with gray border
- Shadow for depth
- Rounded corners
- High z-index (z-50) to appear above other content

## Best Practices

1. **Keep it concise**: Tooltips should provide helpful context, not overwhelming information
2. **Use appropriate positioning**: Ensure tooltips don't go off-screen
3. **Consider mobile**: Tooltips are hover-based and won't work well on touch devices
4. **Accessibility**: Always provide alternative ways to access important information
5. **Performance**: Tooltips are lightweight but avoid putting them on hundreds of elements

## Accessibility

- Tooltips appear on both hover and focus for keyboard accessibility
- Use `aria-label` or `aria-describedby` on the trigger element when appropriate
- Don't put essential information only in tooltips
- Consider using a different pattern for touch devices

## Limitations

1. **No delay options**: Tooltips appear instantly (no hover delay)
2. **No arrow/pointer**: Simple rectangular design without pointing arrow
3. **Basic positioning**: No automatic repositioning if tooltip would go off-screen
4. **Touch devices**: Hover-based interaction doesn't work well on mobile

## Comparison with Original

This implementation is simplified from the Minerva version:

- Removed complex viewport boundary calculations
- Removed portal rendering
- Removed hide delay functionality
- Uses CSS positioning instead of JavaScript calculations
- Results in a more maintainable and predictable component

## Examples with Other Components

### With Buttons

```tsx
<Tooltip content="Save your changes">
  <Button variant="primary">Save</Button>
</Tooltip>
```

### With Cards

```tsx
<Card>
  <CardHeader
    title="Settings"
    action={
      <Tooltip content="Learn more about settings">
        <span className="text-gray-400">?</span>
      </Tooltip>
    }
  />
  <CardContent>...</CardContent>
</Card>
```

### In Tables

```tsx
<td>
  <Tooltip content={`Full name: ${user.fullName}`}>
    <span className="block max-w-[100px] truncate">{user.fullName}</span>
  </Tooltip>
</td>
```
