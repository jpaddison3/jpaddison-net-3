import { redirect } from "next/navigation";
import { auth, signOut } from "~/server/auth";
import { TRPCSection } from "./trpc-section";
import { UIShowcase } from "./ui-showcase";
import {
  Button,
  IconButton,
  LoadingSpinner,
  InlineLoadingSpinner,
  TypingIndicator,
} from "~/components/ui";
import { apiLogger } from "~/lib/logger";

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

  // Log the message (same as tRPC version)
  apiLogger.info("Message Submitted (Server Action)", {
    user: session.user?.email ?? session.user?.name ?? "Unknown",
    content,
    timestamp: new Date().toISOString(),
  });
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
              <Button type="submit" variant="danger" size="sm">
                Sign Out
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="mb-4 font-sans text-lg font-semibold text-gray-800">
                Submit a Message (Server Actions)
                <span className="ml-2 rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                  Server Action
                </span>
              </h2>
              <p className="mb-4 text-sm text-gray-600">
                This demonstrates Next.js Server Actions for server-side form
                handling. The message will be logged to the server console when
                submitted.
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

                <Button type="submit" variant="primary">
                  Submit Message
                </Button>
              </form>
            </div>

            <TRPCSection />

            <div className="border-t pt-6">
              <h3 className="text-md mb-4 font-sans font-semibold text-gray-800">
                Button Component Showcase
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Variants
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="info">Info</Button>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Sizes
                  </h4>
                  <div className="flex items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    States
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Icon Buttons
                  </h4>
                  <div className="flex items-center gap-2">
                    <IconButton aria-label="Settings" variant="primary">
                      ⚙️
                    </IconButton>
                    <IconButton aria-label="Add" variant="secondary">
                      ➕
                    </IconButton>
                    <IconButton aria-label="Delete" variant="danger">
                      🗑️
                    </IconButton>
                    <IconButton aria-label="Recording" variant="recording">
                      🔴
                    </IconButton>
                    <IconButton aria-label="Loading example" loading>
                      ⏳
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-md mb-4 font-sans font-semibold text-gray-800">
                Loading Spinner Showcase
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Sizes
                  </h4>
                  <div className="flex items-center gap-4">
                    <LoadingSpinner size="xs" />
                    <LoadingSpinner size="sm" />
                    <LoadingSpinner size="md" />
                    <LoadingSpinner size="lg" />
                    <LoadingSpinner size="xl" />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    With Label
                  </h4>
                  <div className="space-y-2">
                    <LoadingSpinner size="sm" label="Loading data..." />
                    <LoadingSpinner size="md" label="Processing..." center />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Inline Loading
                  </h4>
                  <div className="space-y-2">
                    <InlineLoadingSpinner message="Fetching results..." />
                    <InlineLoadingSpinner
                      message="Saving changes..."
                      size="xs"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-700">
                    Typing Indicator (Dots)
                  </h4>
                  <div className="rounded-lg bg-gray-100 p-4">
                    <TypingIndicator />
                  </div>
                </div>
              </div>
            </div>

            <UIShowcase />

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
