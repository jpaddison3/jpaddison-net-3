"use client";

import React, { useEffect } from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = "success",
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: "bg-success-600 text-white",
    error: "bg-error-600 text-white",
    info: "bg-info-600 text-white",
  };

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg transition-all ${typeStyles[type]}`}
    >
      {type === "success" && <span>✓</span>}
      {type === "error" && <span>✕</span>}
      {type === "info" && <span>ℹ</span>}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
