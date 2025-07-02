# UI Components Library

A collection of reusable React components built with TypeScript, Tailwind CSS, and class-variance-authority (CVA) for consistent, type-safe styling across the application.

## Overview

This UI component library provides a set of foundational components that follow consistent design patterns and use the project's brand colors and design tokens. All components are built with accessibility and developer experience in mind.

## Available Components

### 🔘 Button Components

- **Button**: Versatile button with 8 variants and 3 sizes
- **IconButton**: Circular icon-only buttons with special variants
- [Full documentation →](./Button.md)

### ⏳ Loading Components

- **LoadingSpinner**: Flexible spinner with multiple variants
- **PageLoadingSpinner**: Full-screen loading states
- **InlineLoadingSpinner**: Compact inline loading indicators
- **TypingIndicator**: Chat-style typing animation
- [Full documentation →](./LoadingSpinner.md)

### 📦 Card Component

- **Card**: Flexible container with 9 variants and hover effects
- **CardHeader**: Consistent header with title and actions
- **CardContent**: Main content area
- **CardFooter**: Footer with separator
- [Full documentation →](./Card.md)

### 🔔 Toast Component

- **Toast**: Temporary notification messages
- Auto-dismiss functionality
- Success, error, and info variants
- [Full documentation →](./Toast.md)

### 💬 Tooltip Component

- **Tooltip**: Hover-triggered information bubbles
- Four positioning options
- Supports rich React content
- [Full documentation →](./Tooltip.md)

## Installation & Setup

These components are already configured in your project. They depend on:

```json
{
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1"
}
```

## Design Tokens

All components use the design tokens defined in `src/styles/globals.css`:

```css
/* Brand colors */
--color-brand-primary: #71eeb8;
--color-brand-hover: #5fe2a3;
--color-brand-light: rgb(113 238 184 / 0.1);
--color-brand-focus: rgb(113 238 184 / 0.2);

/* Semantic colors */
--color-error-*: Red color scale --color-success- *: Green color scale
  --color-warning- *: Orange color scale --color-info- *: Blue color scale;
```

## Import Pattern

All UI components are exported from a central barrel file for convenient imports:

```tsx
import {
  Button,
  IconButton,
  LoadingSpinner,
  PageLoadingSpinner,
  InlineLoadingSpinner,
  TypingIndicator,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Toast,
  Tooltip,
} from "~/components/ui";
```

## Component Principles

### 1. Consistency

All components follow the same patterns for variants, sizes, and states. This makes the API predictable and easy to learn.

### 2. Type Safety

Every component is fully typed with TypeScript. Props are validated at compile time, and variant props are inferred from CVA configurations.

### 3. Accessibility

Components include proper ARIA attributes, keyboard navigation, and focus management where applicable.

### 4. Composability

Components are designed to work well together and can be easily composed into more complex UI patterns.

### 5. Performance

Components use React.forwardRef for ref forwarding and are optimized for minimal re-renders.

## Usage Examples

### Loading States

```tsx
// Page-level loading
if (isLoading) {
  return <PageLoadingSpinner message="Loading your data..." />;
}

// Inline loading in a form
<form onSubmit={handleSubmit}>
  <input type="text" />
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>

// Loading in a data table
<td>
  {isLoadingPrice ? (
    <InlineLoadingSpinner size="xs" />
  ) : (
    <span>${price}</span>
  )}
</td>
```

### Button Patterns

```tsx
// Action buttons in a card footer
<div className="flex gap-2 justify-end">
  <Button variant="ghost" onClick={handleCancel}>
    Cancel
  </Button>
  <Button variant="primary" onClick={handleSave}>
    Save Changes
  </Button>
</div>

// Danger zone
<div className="border border-red-200 rounded-lg p-4">
  <h3>Danger Zone</h3>
  <Button variant="danger" onClick={handleDelete}>
    Delete Account
  </Button>
</div>
```

## Contributing New Components

When adding new components to the library:

1. **Follow the established patterns**: Use CVA for variants, include proper TypeScript types
2. **Document thoroughly**: Create a markdown file with examples and API reference
3. **Export from index**: Add exports to `src/components/ui/index.ts`
4. **Test accessibility**: Ensure keyboard navigation and screen reader support
5. **Use design tokens**: Leverage existing color and spacing tokens

## Future Components

Potential components to add based on common UI patterns:

- **Input**: Form input with variants and validation states
- **Modal**: Accessible modal dialogs
- **Tabs**: Tab navigation component
- **Select**: Custom select dropdown
- **Checkbox/Radio**: Styled form controls
- **Badge**: Small status indicators
- **Alert**: Persistent notification banners
- **Breadcrumb**: Navigation trail component
- **Dropdown**: Menu dropdown component
- **Progress**: Progress bars and indicators

## Resources

- [Class Variance Authority (CVA)](https://cva.style/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React TypeScript Patterns](https://react-typescript-cheatsheet.netlify.app/)
