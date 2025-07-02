import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-gray-900 hover:bg-brand-hover focus:ring-brand-primary cursor-pointer",
        secondary:
          "border border-brand-primary text-brand-primary hover:bg-brand-primary/5 focus:ring-brand-primary cursor-pointer",
        outline:
          "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 cursor-pointer",
        ghost:
          "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 cursor-pointer",
        danger:
          "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 cursor-pointer",
        success:
          "bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 cursor-pointer",
        warning:
          "bg-warning-100 text-warning-800 hover:bg-warning-200 focus:ring-warning-500 cursor-pointer",
        info: "bg-info-50 text-info-600 border border-info-200 hover:bg-info-100 hover:border-info-300 focus:ring-info-500 cursor-pointer",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
    },
  },
);

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-gray-900 hover:bg-brand-hover focus:ring-brand-primary cursor-pointer",
        secondary:
          "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:ring-gray-500 cursor-pointer",
        danger:
          "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500 cursor-pointer",
        recording:
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 cursor-pointer animate-pulse",
      },
      size: {
        sm: "h-6 w-6",
        md: "h-8 w-8",
        lg: "h-10 w-10",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
}

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  children: React.ReactNode;
  loading?: boolean;
  "aria-label": string; // Required for accessibility
}

const LoadingSpinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <svg
      className={clsx("animate-spin", sizeClasses[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={clsx(
          buttonVariants({ variant, size, fullWidth, loading }),
          className,
        )}
        ref={ref}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading && <LoadingSpinner size={size === "lg" ? "md" : "sm"} />}
        {loading && <span className="ml-2">{children}</span>}
        {!loading && children}
      </button>
    );
  },
);

Button.displayName = "Button";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size, loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        className={clsx(
          iconButtonVariants({ variant, size, loading }),
          className,
        )}
        ref={ref}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading ? (
          <LoadingSpinner size={size === "lg" ? "md" : "sm"} />
        ) : (
          children
        )}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
