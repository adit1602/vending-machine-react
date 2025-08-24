"use client";

import type React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info } from "lucide-react";

interface TransactionNotificationProps {
  notification: {
    type: "success" | "error" | "info";
    message: string;
  } | null;
  onClose?: () => void;
}

export const TransactionNotification: React.FC<
  TransactionNotificationProps
> = ({ notification, onClose }) => {
  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <XCircle className="h-5 w-5 text-red-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  };

  const styles = {
    success: "border-green-200 bg-green-50",
    error: "border-red-200 bg-red-50",
    info: "border-blue-200 bg-blue-50",
  };

  const textStyles = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
  };

  return (
    <Alert
      className={`${
        styles[notification.type]
      } transition-all duration-300 animate-in slide-in-from-top-2`}
    >
      <div className="flex items-center gap-3">
        {icons[notification.type]}
        <AlertDescription
          className={`${textStyles[notification.type]} font-medium`}
        >
          {notification.message}
        </AlertDescription>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </Alert>
  );
};
