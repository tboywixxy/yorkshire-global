"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center px-6 py-16 text-center">
          <div className="max-w-xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">Unexpected error</p>
            <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
            <p className="text-base text-gray-600">Please try again or return to the previous page.</p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
