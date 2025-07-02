import Link from "next/link";
import { Suspense } from "react";
import { AuthStatus } from "./auth-status";

export const experimental_ppr = true;

export default function TarskiPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with login/logout button */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="font-sans text-xl font-bold text-gray-800">
            Home
          </Link>
          <Suspense
            fallback={
              <div className="h-10 w-20 animate-pulse rounded-md bg-gray-200" />
            }
          >
            <AuthStatus />
          </Suspense>
        </div>
      </header>

      {/* Main content with Litany of Tarski */}
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-2 font-sans text-4xl font-bold text-[#71eeb8]">
            The Litany of Tarski
          </h1>
          <p className="text-gray-600">A meditation on truth-seeking</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <blockquote className="space-y-6 rounded-lg bg-white p-8 font-serif text-lg leading-relaxed text-gray-800 shadow-sm">
            <p>If the box contains a diamond,</p>
            <p className="pl-8">
              I desire to believe that the box contains a diamond;
            </p>
            <p>If the box does not contain a diamond,</p>
            <p className="pl-8">
              I desire to believe that the box does not contain a diamond;
            </p>
            <p className="pt-4 font-medium">
              Let me not become attached to beliefs I may not want.
            </p>
          </blockquote>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              — Eliezer Yudkowsky, inspired by Alfred Tarski
            </p>
          </div>
        </div>

        {/* Additional navigation */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="text-blue-600 underline hover:text-blue-800"
          >
            About JP Addison
          </Link>
        </div>
      </div>
    </main>
  );
}
