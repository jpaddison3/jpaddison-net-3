# LoadingSpinner Component Documentation

A versatile loading spinner component with multiple variants, sizes, and pre-configured states built using class-variance-authority for type-safe styling.

## Features

- ✅ Two variants: circular spinner and bouncing dots
- ✅ Five sizes (xs, sm, md, lg, xl)
- ✅ Optional labels with flexible positioning
- ✅ Pre-configured components for common use cases
- ✅ TypeScript support with proper prop validation
- ✅ Accessibility-friendly with proper ARIA attributes
- ✅ Uses brand primary color (#71eeb8)
- ✅ Smooth animations with Tailwind CSS

## Basic Usage

```tsx
import {
  LoadingSpinner,
  PageLoadingSpinner,
  InlineLoadingSpinner,
  TypingIndicator,
} from "~/components/ui";

// Basic spinner
<LoadingSpinner />

// Different sizes
<LoadingSpinner size="xs" />
<LoadingSpinner size="lg" />

// With label
<LoadingSpinner label="Loading..." />

// Centered with label
<LoadingSpinner label="Processing..." center />

// Dots variant (for typing indicators)
<LoadingSpinner variant="dots" />
```

## Variants

### Spinner (Default)

The default circular border spinner with a smooth rotation animation. Perfect for general loading states.

```tsx
<LoadingSpinner variant="spinner" size="md" />
```

### Dots

Three bouncing dots animation, ideal for typing indicators or processing states.

```tsx
<LoadingSpinner variant="dots" size="md" />
```

## Sizes

The component supports five sizes to fit different contexts:

```tsx
<LoadingSpinner size="xs" /> // 12x12px
<LoadingSpinner size="sm" /> // 16x16px
<LoadingSpinner size="md" /> // 24x24px (default)
<LoadingSpinner size="lg" /> // 32x32px
<LoadingSpinner size="xl" /> // 48x48px
```

## Pre-configured Components

### PageLoadingSpinner

Full-screen loading state with centered spinner and message. Perfect for page transitions or initial data loading.

```tsx
// Default message
<PageLoadingSpinner />

// Custom message
<PageLoadingSpinner message="Loading your dashboard..." />
```

### InlineLoadingSpinner

Compact loading indicator for inline use within forms, buttons, or text content.

```tsx
// Basic inline loading
<InlineLoadingSpinner />

// With custom message
<InlineLoadingSpinner message="Saving changes..." />

// Different size
<InlineLoadingSpinner message="Updating..." size="xs" />
```

### TypingIndicator

Chat-style typing indicator using the dots variant. Commonly used in messaging interfaces.

```tsx
// Default size
<TypingIndicator />

// Smaller variant
<TypingIndicator size="sm" />
```

## Advanced Usage

### With Forms

```tsx
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button className="flex items-center gap-2">
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? "Submitting..." : "Submit"}
    </button>
  );
}
```

### Loading States in Cards

```tsx
function DataCard({ isLoading, data }: Props) {
  if (isLoading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <InlineLoadingSpinner message="Fetching data..." />
      </div>
    );
  }

  return <div>{/* Your data content */}</div>;
}
```

### Custom Styling

```tsx
// Custom colors or additional classes
<LoadingSpinner
  className="text-blue-500"
  size="lg"
/>

// In a flex container
<div className="flex items-center justify-between">
  <span>Processing payment</span>
  <LoadingSpinner size="sm" />
</div>
```

## API Reference

### LoadingSpinner Props

| Prop      | Type                                   | Default     | Description                      |
| --------- | -------------------------------------- | ----------- | -------------------------------- |
| variant   | `"spinner" \| "dots"`                  | `"spinner"` | Visual variant of the spinner    |
| size      | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"`      | Size of the spinner              |
| label     | `string`                               | -           | Optional text label              |
| center    | `boolean`                              | `false`     | Centers the spinner and label    |
| className | `string`                               | -           | Additional CSS classes           |
| ...props  | `React.HTMLAttributes<div>`            | -           | All standard div HTML attributes |

### PageLoadingSpinner Props

| Prop    | Type     | Default        | Description                |
| ------- | -------- | -------------- | -------------------------- |
| message | `string` | `"Loading..."` | Loading message to display |

### InlineLoadingSpinner Props

| Prop    | Type                   | Default | Description                 |
| ------- | ---------------------- | ------- | --------------------------- |
| message | `string`               | -       | Optional message to display |
| size    | `"xs" \| "sm" \| "md"` | `"sm"`  | Size of the spinner         |

### TypingIndicator Props

| Prop | Type           | Default | Description      |
| ---- | -------------- | ------- | ---------------- |
| size | `"sm" \| "md"` | `"md"`  | Size of the dots |

## Styling Details

The component uses Tailwind CSS classes and CSS custom properties:

- **Brand Primary**: Uses `border-brand-primary` and `bg-brand-primary` (#71eeb8)
- **Animation**: `animate-spin` for spinner, `animate-bounce` with delays for dots
- **Focus states**: Inherits focus behavior from parent components

## Accessibility

- The spinner is purely decorative and doesn't require ARIA labels
- When used with labels, the text provides context for screen readers
- For critical loading states, consider adding `aria-busy="true"` to the parent container
- The component respects `prefers-reduced-motion` through Tailwind's motion-safe utilities

## Best Practices

1. **Size Selection**: Use smaller sizes (xs, sm) for inline contexts and larger sizes (lg, xl) for page-level loading states

2. **Label Usage**: Always include a label when the loading state isn't immediately obvious from context

3. **Placement**: Position spinners where users expect feedback - near submit buttons, in place of content being loaded, etc.

4. **Duration**: For operations longer than 2-3 seconds, consider adding progress indicators or status messages alongside the spinner

5. **Error Handling**: Always provide a way to exit the loading state, especially for network requests that might fail
