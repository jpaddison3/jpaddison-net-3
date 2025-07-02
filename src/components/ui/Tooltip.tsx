"use client";

import React, { useState } from "react";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  size?: "sm" | "md" | "lg";
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({
  children,
  content,
  size = "md",
  position = "bottom",
  className = "",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base",
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`absolute z-50 rounded-lg border border-gray-200 bg-white shadow-lg ${positionClasses[position]} ${sizeClasses[size]} ${className} ${typeof content === "string" ? "whitespace-nowrap" : ""}`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}
