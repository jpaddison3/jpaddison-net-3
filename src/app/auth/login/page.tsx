import { signIn } from "~/server/auth";
import { redirect } from "next/navigation";
import { LoginForm, type ActionState } from "./login-form";

async function submitEmail(formData: FormData): Promise<ActionState> {
  "use server";

  const email = formData.get("email") as string;

  if (!email?.trim()) {
    return { error: "Email is required" };
  }

  try {
    await signIn("email", {
      email,
      redirect: false,
    });

    return { success: true as const, email };
  } catch (error) {
    console.error("Sign in error:", error);
    return { error: "Failed to send magic link" };
  }
}

function BackToHome() {
  async function goHome() {
    "use server";
    redirect("/");
  }

  return (
    <form action={goHome} className="mt-6 text-center">
      <button
        type="submit"
        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
      >
        ← Back to homepage
      </button>
    </form>
  );
}

export default function LoginPage() {
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

          <LoginForm submitEmail={submitEmail} />

          <BackToHome />
        </div>
      </div>
    </main>
  );
}
