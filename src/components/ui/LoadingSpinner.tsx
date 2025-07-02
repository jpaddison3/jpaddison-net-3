import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const spinnerVariants = cva(
  "border-brand-primary animate-spin rounded-full border-b-2",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        // Main spinner - circular border animation
        spinner: "",
        // Dots animation for typing indicators
        dots: "!border-0 !animate-none flex items-center gap-1",
      },
    },
    defaultVariants: {
      variant: "spinner",
      size: "md",
    },
  },
);

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  center?: boolean;
}

export const LoadingSpinner = React.forwardRef<
  HTMLDivElement,
  LoadingSpinnerProps
>(({ className, variant, size, label, center = false, ...props }, ref) => {
  if (variant === "dots") {
    const dotSize =
      size === "xs" ? "h-2 w-2" : size === "sm" ? "h-2 w-2" : "h-3 w-3";

    return (
      <div
        className={clsx(
          spinnerVariants({ variant }),
          center && "justify-center",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div
          className={clsx(
            "bg-brand-primary aspect-square flex-shrink-0",
            dotSize,
            "animate-bounce rounded-full [animation-delay:-0.3s]",
          )}
        />
        <div
          className={clsx(
            "bg-brand-primary aspect-square flex-shrink-0",
            dotSize,
            "animate-bounce rounded-full [animation-delay:-0.15s]",
          )}
        />
        <div
          className={clsx(
            "bg-brand-primary aspect-square flex-shrink-0",
            dotSize,
            "animate-bounce rounded-full",
          )}
        />
      </div>
    );
  }

  // Default spinner variant
  const content = (
    <div
      className={clsx(spinnerVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );

  if (label) {
    return (
      <div
        className={clsx("flex items-center gap-2", center && "justify-center")}
      >
        {content}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    );
  }

  if (center) {
    return <div className="flex items-center justify-center">{content}</div>;
  }

  return content;
});

LoadingSpinner.displayName = "LoadingSpinner";

// Pre-configured loading states for common use cases
export interface PageLoadingSpinnerProps {
  message?: string;
}

export const PageLoadingSpinner: React.FC<PageLoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export interface InlineLoadingSpinnerProps {
  message?: string;
  size?: "xs" | "sm" | "md";
}

export const InlineLoadingSpinner: React.FC<InlineLoadingSpinnerProps> = ({
  message,
  size = "sm",
}) => {
  return (
    <div className="flex items-center gap-2">
      <LoadingSpinner variant="spinner" size={size} />
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
};

export interface TypingIndicatorProps {
  size?: "sm" | "md";
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  size = "md",
}) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 px-4 py-3">
        <LoadingSpinner variant="dots" size={size} />
      </div>
    </div>
  );
};
