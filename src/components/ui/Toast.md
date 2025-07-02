# Toast Component Documentation

A simple notification component that displays temporary messages to provide feedback to users. Toast notifications appear in the bottom-right corner and auto-dismiss after a configurable duration.

## Features

- ✅ Three types: success, error, info
- ✅ Auto-dismiss with configurable duration
- ✅ Fixed positioning (bottom-right)
- ✅ Smooth animations
- ✅ Icon indicators for each type
- ✅ TypeScript support
- ✅ Client-side component

## Basic Usage

```tsx
import { Toast } from "~/components/ui";
import { useState } from "react";

function MyComponent() {
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <button onClick={() => setShowToast(true)}>Show Toast</button>

      {showToast && (
        <Toast
          message="Operation completed!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
```

## Toast Types

### Success

For positive feedback and confirmations:

```tsx
<Toast
  message="Changes saved successfully!"
  type="success"
  onClose={() => setShowToast(false)}
/>
```

### Error

For error messages and failures:

```tsx
<Toast
  message="Something went wrong. Please try again."
  type="error"
  onClose={() => setShowToast(false)}
/>
```

### Info

For informational messages:

```tsx
<Toast
  message="New updates are available"
  type="info"
  onClose={() => setShowToast(false)}
/>
```

## Duration

Control how long the toast stays visible:

```tsx
// Default: 3 seconds
<Toast message="Default duration" onClose={handleClose} />

// Custom duration: 5 seconds
<Toast
  message="Visible for 5 seconds"
  duration={5000}
  onClose={handleClose}
/>

// Longer duration for important messages
<Toast
  message="Important: Please read this carefully"
  type="error"
  duration={10000}
  onClose={handleClose}
/>
```

## Advanced Examples

### Multiple Toasts

Managing multiple toast notifications:

```tsx
function MultiToastExample() {
  const [toasts, setToasts] = useState<
    Array<{
      id: number;
      message: string;
      type: "success" | "error" | "info";
    }>
  >([]);

  const addToast = (message: string, type: "success" | "error" | "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <button onClick={() => addToast("Success!", "success")}>
        Success Toast
      </button>

      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          style={{ bottom: `${(index + 1) * 60}px` }}
          className="fixed right-4 z-50"
        >
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </>
  );
}
```

### With Form Submission

```tsx
function FormWithToast() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await saveData();
      setToastMessage("Data saved successfully!");
      setToastType("success");
    } catch (error) {
      setToastMessage("Failed to save data");
      setToastType("error");
    }

    setShowToast(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <button type="submit">Save</button>
      </form>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
```

### Custom Hook for Toasts

Create a reusable hook:

```tsx
function useToast() {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const ToastComponent = toast.show ? (
    <Toast message={toast.message} type={toast.type} onClose={hideToast} />
  ) : null;

  return { showToast, ToastComponent };
}

// Usage
function MyComponent() {
  const { showToast, ToastComponent } = useToast();

  return (
    <>
      <button onClick={() => showToast("Hello!", "info")}>Show Toast</button>
      {ToastComponent}
    </>
  );
}
```

## API Reference

### Toast Props

| Prop     | Type                             | Default     | Description                              |
| -------- | -------------------------------- | ----------- | ---------------------------------------- |
| message  | `string`                         | required    | The message to display                   |
| type     | `"success" \| "error" \| "info"` | `"success"` | Visual style and icon of the toast       |
| duration | `number`                         | `3000`      | Time in milliseconds before auto-dismiss |
| onClose  | `() => void`                     | required    | Callback when toast should close         |

## Styling

The Toast component uses semantic color classes from your design system:

- Success: `bg-success-600` (green)
- Error: `bg-error-600` (red)
- Info: `bg-info-600` (blue)

Icons are simple Unicode characters:

- Success: ✓
- Error: ✕
- Info: ℹ

## Positioning

Toasts are positioned with:

- `fixed` positioning
- `right-4 bottom-4` (16px from right and bottom edges)
- `z-50` for high z-index to appear above other content

## Limitations

The current Toast implementation is basic and has some limitations:

1. **Manual State Management**: You need to manage show/hide state in parent components
2. **Single Toast**: Showing multiple toasts requires custom positioning logic
3. **No Animation**: Toasts appear/disappear instantly without slide animations
4. **Fixed Position**: Always appears in bottom-right, not configurable

## Best Practices

1. **Clear Messages**: Keep toast messages short and actionable
2. **Appropriate Types**: Use the correct type for the situation
3. **Timing**: Use longer durations for important messages
4. **Avoid Overuse**: Don't overwhelm users with too many toasts
5. **Actionable**: If the error is fixable, tell users how

## Accessibility Considerations

- The toast component uses semantic colors but also includes icons for users who may have difficulty distinguishing colors
- Consider adding `role="alert"` for important messages
- Ensure messages are clear and understandable
- For critical errors, consider using a more persistent notification method

## Future Enhancements

Potential improvements for a more robust toast system:

- Toast queue/stack management
- Slide-in/out animations
- Configurable positioning
- Action buttons (e.g., "Undo")
- Progress indicators for long operations
- Persistent toasts that don't auto-dismiss
- Toast provider/context for easier management
