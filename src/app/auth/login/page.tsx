"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn("email", {
        email,
        redirect: false,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-gray-50 font-serif">
        <div className="container mx-auto max-w-md px-4 py-32">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <div className="text-center">
              <h1 className="mb-4 font-sans text-2xl font-bold text-gray-800">
                Check your email
              </h1>
              <p className="text-gray-600">
                We've sent a magic link to{" "}
                <span className="font-medium">{email}</span>. Click the link in
                the email to sign in.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                (In development: check the server console for the magic link)
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-md px-4 py-32">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="mb-2 font-sans text-2xl font-bold text-gray-800">
              Sign in
            </h1>
            <p className="text-gray-600">
              Enter your email to receive a magic link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isLoading ? "Sending magic link..." : "Send magic link"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              ← Back to homepage
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
