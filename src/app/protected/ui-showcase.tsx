"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Toast,
  Tooltip,
} from "~/components/ui";

export function UIShowcase() {
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error" | "info">(
    "success",
  );

  const showToastMessage = (type: "success" | "error" | "info") => {
    setToastType(type);
    setShowToast(true);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Card Component Showcase */}
        <div className="border-t pt-6">
          <h3 className="text-md mb-4 font-sans font-semibold text-gray-800">
            Card Component Showcase
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader
                title="Default Card"
                subtitle="With header and content"
              />
              <CardContent>
                <p>This is a default card with standard styling.</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm">
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card variant="brand">
              <CardHeader title="Brand Card" />
              <CardContent>
                <p>A card with brand primary color styling.</p>
              </CardContent>
            </Card>

            <Card variant="elevated" hover="lift">
              <CardContent>
                <p className="font-medium">Elevated Card</p>
                <p className="mt-2 text-sm text-gray-600">
                  This card has elevation and lifts on hover.
                </p>
              </CardContent>
            </Card>

            <Card variant="selected">
              <CardContent>
                <p className="font-medium">Selected State</p>
                <p className="mt-2 text-sm">
                  This shows a selected or active card state.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card variant="success" padding="sm">
              <CardContent>Success message card</CardContent>
            </Card>
            <Card variant="warning" padding="sm">
              <CardContent>Warning message card</CardContent>
            </Card>
            <Card variant="error" padding="sm">
              <CardContent>Error message card</CardContent>
            </Card>
          </div>
        </div>

        {/* Toast Component Showcase */}
        <div className="border-t pt-6">
          <h3 className="text-md mb-4 font-sans font-semibold text-gray-800">
            Toast Notifications
          </h3>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="success"
              onClick={() => showToastMessage("success")}
            >
              Show Success Toast
            </Button>
            <Button variant="danger" onClick={() => showToastMessage("error")}>
              Show Error Toast
            </Button>
            <Button variant="info" onClick={() => showToastMessage("info")}>
              Show Info Toast
            </Button>
          </div>
        </div>

        {/* Tooltip Component Showcase */}
        <div className="border-t pt-6">
          <h3 className="text-md mb-4 font-sans font-semibold text-gray-800">
            Tooltips
          </h3>

          <div className="flex flex-wrap items-center gap-6">
            <Tooltip content="This is a tooltip on top" position="top">
              <Button variant="outline">Hover me (top)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on bottom" position="bottom">
              <Button variant="outline">Hover me (bottom)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on the left" position="left">
              <Button variant="outline">Hover me (left)</Button>
            </Tooltip>

            <Tooltip content="This is a tooltip on the right" position="right">
              <Button variant="outline">Hover me (right)</Button>
            </Tooltip>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Tooltip
              content={
                <div className="max-w-xs">
                  <p className="font-medium">Rich content tooltip</p>
                  <p className="mt-1 text-sm text-gray-600">
                    Tooltips can contain any React content including formatted
                    text, links, and more.
                  </p>
                </div>
              }
              size="lg"
            >
              <Button variant="secondary">Complex tooltip</Button>
            </Tooltip>

            <Tooltip content="Small tooltip" size="sm">
              <span className="text-brand-primary cursor-pointer underline">
                Inline text with tooltip
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Toast container */}
      {showToast && (
        <Toast
          message={
            toastType === "success"
              ? "Operation completed successfully!"
              : toastType === "error"
                ? "An error occurred. Please try again."
                : "This is an informational message."
          }
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
