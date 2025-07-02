# Card Component Documentation

A flexible container component that provides consistent styling and layout for grouping related content. Built using class-variance-authority for type-safe variant management.

## Features

- ✅ Multiple variants for different use cases
- ✅ Configurable padding sizes
- ✅ Optional hover effects
- ✅ Semantic HTML element support (div, section, article)
- ✅ Composable sub-components (CardHeader, CardContent, CardFooter)
- ✅ TypeScript support with proper prop validation
- ✅ Consistent with brand design tokens

## Basic Usage

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui";

// Basic card
<Card>
  <CardContent>
    <p>Simple card content</p>
  </CardContent>
</Card>

// Card with header and footer
<Card>
  <CardHeader title="Card Title" subtitle="Optional subtitle" />
  <CardContent>
    <p>Your content here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Card Variants

### Default

Standard card with border and subtle shadow.

```tsx
<Card variant="default">
  <CardContent>Default styling</CardContent>
</Card>
```

### Outlined

Simple bordered card without shadow.

```tsx
<Card variant="outlined">
  <CardContent>Outlined card</CardContent>
</Card>
```

### Elevated

Card with stronger shadow for emphasis.

```tsx
<Card variant="elevated">
  <CardContent>Elevated card with shadow</CardContent>
</Card>
```

### Flat

No border or shadow, just background.

```tsx
<Card variant="flat">
  <CardContent>Flat card design</CardContent>
</Card>
```

### Brand

Uses brand primary color for border and background.

```tsx
<Card variant="brand">
  <CardContent>Brand-styled card</CardContent>
</Card>
```

### Selected

Shows active/selected state with brand colors.

```tsx
<Card variant="selected">
  <CardContent>Selected card state</CardContent>
</Card>
```

### Status Variants

Alert-style cards for different states:

```tsx
<Card variant="success">
  <CardContent>Success message</CardContent>
</Card>

<Card variant="warning">
  <CardContent>Warning message</CardContent>
</Card>

<Card variant="error">
  <CardContent>Error message</CardContent>
</Card>
```

## Padding Options

Control internal spacing:

```tsx
<Card padding="none">No padding</Card>
<Card padding="sm">Small padding</Card>
<Card padding="md">Medium padding (default)</Card>
<Card padding="lg">Large padding</Card>
<Card padding="xl">Extra large padding</Card>
```

## Hover Effects

Add interactive hover states:

```tsx
// No hover effect (default)
<Card hover="none">Static card</Card>

// Subtle shadow on hover
<Card hover="subtle">Hover for shadow</Card>

// Lift effect on hover
<Card hover="lift">Hover to lift</Card>
```

## Sub-components

### CardHeader

Consistent header with title, subtitle, and optional action:

```tsx
<CardHeader
  title="Main Title"
  subtitle="Supporting text"
  action={<Button size="sm">Edit</Button>}
/>

// Or with custom content
<CardHeader>
  <h3>Custom Header Content</h3>
</CardHeader>
```

### CardContent

Main content area with consistent text styling:

```tsx
<CardContent>
  <p>Your content here</p>
</CardContent>

// With custom className
<CardContent className="space-y-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</CardContent>
```

### CardFooter

Footer area with border separator:

```tsx
<CardFooter>
  <div className="flex justify-end gap-2">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary">Save</Button>
  </div>
</CardFooter>
```

## Advanced Examples

### Interactive Card

```tsx
<Card
  variant="outlined"
  hover="lift"
  onClick={() => handleClick()}
  className="cursor-pointer"
>
  <CardContent>
    <h4 className="font-medium">Click me</h4>
    <p className="text-sm text-gray-600">Interactive card example</p>
  </CardContent>
</Card>
```

### Dashboard Widget

```tsx
<Card variant="elevated">
  <CardHeader
    title="Sales Overview"
    action={
      <select className="rounded border px-2 py-1 text-sm">
        <option>Last 7 days</option>
        <option>Last 30 days</option>
      </select>
    }
  />
  <CardContent>
    <div className="text-3xl font-bold">$12,345</div>
    <p className="text-sm text-gray-600">+12% from last period</p>
  </CardContent>
</Card>
```

### Form Card

```tsx
<Card as="section" padding="lg">
  <CardHeader
    title="User Settings"
    subtitle="Update your profile information"
  />
  <CardContent>
    <form className="space-y-4">
      <input type="text" placeholder="Name" className="w-full" />
      <input type="email" placeholder="Email" className="w-full" />
    </form>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Save Changes</Button>
  </CardFooter>
</Card>
```

## API Reference

### Card Props

| Prop      | Type                                                                                                            | Default     | Description                  |
| --------- | --------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------- |
| variant   | `"default" \| "outlined" \| "elevated" \| "flat" \| "brand" \| "selected" \| "warning" \| "error" \| "success"` | `"default"` | Visual style of the card     |
| padding   | `"none" \| "sm" \| "md" \| "lg" \| "xl"`                                                                        | `"md"`      | Internal padding size        |
| hover     | `"none" \| "subtle" \| "lift"`                                                                                  | `"none"`    | Hover effect style           |
| as        | `"div" \| "section" \| "article"`                                                                               | `"div"`     | HTML element to render       |
| className | `string`                                                                                                        | -           | Additional CSS classes       |
| children  | `React.ReactNode`                                                                                               | -           | Card content                 |
| ...props  | `React.HTMLAttributes<HTMLDivElement>`                                                                          | -           | All standard HTML attributes |

### CardHeader Props

| Prop      | Type                                   | Default | Description                  |
| --------- | -------------------------------------- | ------- | ---------------------------- |
| title     | `string`                               | -       | Main header text             |
| subtitle  | `string`                               | -       | Supporting text below title  |
| action    | `React.ReactNode`                      | -       | Content for the right side   |
| className | `string`                               | -       | Additional CSS classes       |
| children  | `React.ReactNode`                      | -       | Custom header content        |
| ...props  | `React.HTMLAttributes<HTMLDivElement>` | -       | All standard HTML attributes |

### CardContent Props

| Prop      | Type                                   | Default | Description                  |
| --------- | -------------------------------------- | ------- | ---------------------------- |
| className | `string`                               | -       | Additional CSS classes       |
| children  | `React.ReactNode`                      | -       | Content                      |
| ...props  | `React.HTMLAttributes<HTMLDivElement>` | -       | All standard HTML attributes |

### CardFooter Props

| Prop      | Type                                   | Default | Description                  |
| --------- | -------------------------------------- | ------- | ---------------------------- |
| className | `string`                               | -       | Additional CSS classes       |
| children  | `React.ReactNode`                      | -       | Footer content               |
| ...props  | `React.HTMLAttributes<HTMLDivElement>` | -       | All standard HTML attributes |

## Design Considerations

- Cards use your brand colors via CSS variables (e.g., `bg-brand-light`)
- The default variant provides subtle elevation without being too prominent
- Status variants (success, warning, error) use semantic colors from your design system
- Padding scales are consistent with your spacing system
- Hover effects use CSS transitions for smooth interactions

## Accessibility

- Use semantic HTML elements with the `as` prop when appropriate
- Cards are keyboard accessible when interactive
- Color contrast meets WCAG guidelines
- Status cards should include appropriate ARIA labels or text content to convey meaning

## Best Practices

1. **Choose the right variant**: Use status variants only for actual status messages
2. **Consistent padding**: Stick to one padding size across similar cards
3. **Semantic HTML**: Use `as="article"` for blog posts, `as="section"` for page sections
4. **Avoid nesting cards**: Cards shouldn't contain other cards
5. **Interactive states**: Use hover effects only on clickable cards
