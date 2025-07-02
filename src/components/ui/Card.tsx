import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const cardVariants = cva("rounded-lg bg-white transition-all", {
  variants: {
    variant: {
      default: "border border-gray-200 shadow-sm",
      outlined: "border border-gray-200",
      elevated: "border border-gray-200 shadow-md",
      flat: "border-0",
      brand: "border border-brand-primary/20 bg-brand-light shadow-sm",
      selected: "border-2 border-brand-primary bg-brand-light shadow-md",
      warning: "border border-warning-200 bg-warning-50",
      error: "border border-error-200 bg-error-50",
      success: "border border-success-200 bg-success-50",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
      xl: "p-8",
    },
    hover: {
      none: "",
      subtle: "hover:shadow-md",
      lift: "hover:shadow-lg hover:-translate-y-1",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
    hover: "none",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "section" | "article";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      hover,
      as: Component = "div",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        className={clsx(cardVariants({ variant, padding, hover }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = "Card";

// Header component for consistent card headers
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, title, subtitle, action, children, ...props }, ref) => {
    return (
      <div
        className={clsx("mb-4 border-b border-gray-200 pb-4", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            )}
            {children}
          </div>
          {action && <div className="ml-4 flex-shrink-0">{action}</div>}
        </div>
      </div>
    );
  },
);

CardHeader.displayName = "CardHeader";

// Content component for consistent card content
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div className={clsx("text-gray-700", className)} ref={ref} {...props} />
  );
});

CardContent.displayName = "CardContent";

// Footer component for consistent card footers
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={clsx("mt-4 border-t border-gray-200 pt-4", className)}
      ref={ref}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";
