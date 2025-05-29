import { redirect } from "next/navigation";
import { auth, signOut } from "~/server/auth";

async function submitMessage(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }

  const content = formData.get("message") as string;
  if (!content?.trim()) {
    throw new Error("Message is required");
  }

  // Console log the message (same as tRPC version)
  console.log("💬 Message Submitted (Server Action)");
  console.log(
    "👤 User:",
    session.user?.email ?? session.user?.name ?? "Unknown",
  );
  console.log("📝 Content:", content);
  console.log("⏰ Timestamp:", new Date().toISOString());
  console.log("─".repeat(80));
}

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function ProtectedPage() {
  const session = await auth();

  // Server-side redirect if not authenticated
  if (!session) {
    redirect("/auth/login");
  }

  // Authenticated - show the protected content
  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-sans text-2xl font-bold text-gray-800">
                Protected Page
              </h1>
              <p className="text-gray-600">
                Welcome, {session.user?.email ?? session.user?.name}!
              </p>
            </div>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Sign Out
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 font-sans text-lg font-semibold text-gray-800">
                Submit a Message
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                Type a message below. It will be logged to the server console
                when submitted.
              </p>

              <form action={submitMessage} className="space-y-4">
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  Submit Message
                </button>
              </form>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-md mb-2 font-sans font-semibold text-gray-800">
                Session Info
              </h3>
              <pre className="overflow-x-auto rounded bg-gray-100 p-3 text-xs text-gray-700">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
