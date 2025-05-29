"use client";

import { useState } from "react";
import { useActionState } from "react";

export type ActionState =
  | { success: true; email: string }
  | { error: string }
  | null;

type SubmitEmailAction = (formData: FormData) => Promise<ActionState>;

// Type guard for error state
function isErrorState(state: ActionState): state is { error: string } {
  return state !== null && "error" in state;
}

export function LoginForm({ submitEmail }: { submitEmail: SubmitEmailAction }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Use useActionState to handle the Server Action
  const [state, formAction, isPending] = useActionState(
    async (
      prevState: ActionState,
      formData: FormData,
    ): Promise<ActionState> => {
      try {
        const result = await submitEmail(formData);
        const email = formData.get("email") as string;
        setSubmittedEmail(email);
        setIsSubmitted(true);
        return result;
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    null,
  );

  // Show success state
  if (isSubmitted) {
    return (
      <div className="text-center">
        <h2 className="mb-4 font-sans text-xl font-bold text-gray-800">
          Check your email
        </h2>
        <p className="text-gray-600">
          We've sent a magic link to{" "}
          <span className="font-medium">{submittedEmail}</span>. Click the link
          in the email to sign in.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          (In development: check the server console for the magic link)
        </p>
      </div>
    );
  }

  // Show form
  return (
    <form action={formAction} className="space-y-4">
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
          name="email"
          required
          disabled={isPending}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
          placeholder="your@email.com"
        />
      </div>

      {isErrorState(state) && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {isPending ? "Sending magic link..." : "Send magic link"}
      </button>
    </form>
  );
}
