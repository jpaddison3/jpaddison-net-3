# Button Component Documentation

A comprehensive, reusable Button component with multiple variants, sizes, and states built using class-variance-authority for type-safe styling.

## Features

- ✅ Multiple variants (primary, secondary, outline, ghost, danger, success, warning, info)
- ✅ Three sizes (sm, md, lg)
- ✅ Loading and disabled states
- ✅ Full width option
- ✅ Icon-only circular buttons
- ✅ TypeScript support with proper prop validation
- ✅ Accessibility features (ARIA labels, focus management)
- ✅ Consistent with brand design tokens

## Basic Usage

```tsx
import { Button, IconButton } from "~/components/ui";

// Basic button
<Button>Click me</Button>

// Primary action button
<Button variant="primary" size="lg">
  Get Started
</Button>

// Secondary button
<Button variant="secondary">
  Learn More
</Button>

// Loading state
<Button loading>
  Saving...
</Button>

// Icon button
<IconButton aria-label="Close" variant="secondary">
  ✕
</IconButton>
```

## Button Variants

### Primary

Used for main call-to-action buttons. Uses brand primary colors (#71eeb8).

```tsx
<Button variant="primary">Primary Action</Button>
```

### Secondary

Used for secondary actions. Has brand-colored border with transparent background.

```tsx
<Button variant="secondary">Secondary Action</Button>
```

### Outline

Used for tertiary actions. Gray border with transparent background.

```tsx
<Button variant="outline">Outline Button</Button>
```

### Ghost

Minimal styling for subtle actions.

```tsx
<Button variant="ghost">Ghost Button</Button>
```

### Danger

Used for destructive actions like delete.

```tsx
<Button variant="danger">Delete Item</Button>
```

### Success

Used to indicate successful actions or positive states.

```tsx
<Button variant="success">Save Changes</Button>
```

### Warning

Used for actions that require caution.

```tsx
<Button variant="warning">Proceed with Caution</Button>
```

### Info

Used for informational actions.

```tsx
<Button variant="info">Learn More</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

## States

### Loading State

Shows a loading spinner and disables the button.

```tsx
<Button loading>Processing...</Button>

// With custom loading text
<Button variant="primary" loading>
  Creating account...
</Button>
```

### Disabled State

```tsx
<Button disabled>Disabled Button</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

## Icon Buttons

Icon buttons are circular buttons designed for icon-only use cases. They require an `aria-label` for accessibility.

```tsx
import { IconButton } from "~/components/ui";

// Basic icon button
<IconButton aria-label="Settings">
  ⚙️
</IconButton>

// Different variants
<IconButton variant="primary" aria-label="Add">
  +
</IconButton>

<IconButton variant="danger" aria-label="Delete">
  🗑️
</IconButton>

// Recording state with pulse animation
<IconButton variant="recording" aria-label="Stop recording">
  ⏹️
</IconButton>
```

## With Forms

### Server Actions

```tsx
<form action={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>
```

### Client-side handlers

```tsx
<Button onClick={() => handleClick()}>Click me</Button>
```

## Accessibility

- All buttons include proper focus states with visible focus rings
- Icon buttons require an `aria-label` prop (TypeScript enforced)
- Disabled buttons are properly announced to screen readers
- Loading states are conveyed through both visual and ARIA attributes

## API Reference

### Button Props

| Prop      | Type                                                                                               | Default     | Description                               |
| --------- | -------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| variant   | `"primary" \| "secondary" \| "outline" \| "ghost" \| "danger" \| "success" \| "warning" \| "info"` | `"primary"` | Visual variant of the button              |
| size      | `"sm" \| "md" \| "lg"`                                                                             | `"md"`      | Size of the button                        |
| fullWidth | `boolean`                                                                                          | `false`     | Whether button should take full width     |
| loading   | `boolean`                                                                                          | `false`     | Shows loading spinner and disables button |
| disabled  | `boolean`                                                                                          | `false`     | Disables the button                       |
| children  | `React.ReactNode`                                                                                  | required    | Button content                            |
| className | `string`                                                                                           | -           | Additional CSS classes                    |
| ...props  | `React.ButtonHTMLAttributes`                                                                       | -           | All standard button HTML attributes       |

### IconButton Props

| Prop       | Type                                                  | Default       | Description                               |
| ---------- | ----------------------------------------------------- | ------------- | ----------------------------------------- |
| variant    | `"primary" \| "secondary" \| "danger" \| "recording"` | `"secondary"` | Visual variant of the icon button         |
| size       | `"sm" \| "md" \| "lg"`                                | `"md"`        | Size of the icon button                   |
| loading    | `boolean`                                             | `false`       | Shows loading spinner and disables button |
| disabled   | `boolean`                                             | `false`       | Disables the button                       |
| aria-label | `string`                                              | required      | Accessibility label (required)            |
| children   | `React.ReactNode`                                     | required      | Icon content                              |
| className  | `string`                                              | -             | Additional CSS classes                    |
| ...props   | `React.ButtonHTMLAttributes`                          | -             | All standard button HTML attributes       |

## Design Tokens

The button component uses design tokens defined in `src/styles/globals.css`:

- **Brand Primary**: `#71eeb8` - Your main brand color
- **Brand Hover**: `#5fe2a3` - Darker shade for hover states
- **Semantic colors**: Error, Success, Warning, Info variants use Tailwind's color palette
