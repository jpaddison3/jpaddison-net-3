"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui";
import { apiLogger } from "~/lib/logger";

export function TRPCSection() {
  const [postName, setPostName] = useState("");
  const [helloText, setHelloText] = useState("");

  // tRPC queries
  const { data: secretMessage } = api.post.getSecretMessage.useQuery();
  const { data: latestPost, refetch: refetchLatest } =
    api.post.getLatest.useQuery();
  const { data: helloResponse } = api.post.hello.useQuery(
    { text: helloText },
    { enabled: !!helloText.trim() },
  );

  // tRPC mutations
  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      setPostName("");
      void refetchLatest();
    },
  });

  const submitMessage = api.message.submit.useMutation();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postName.trim()) return;

    try {
      await createPost.mutateAsync({ name: postName });
    } catch (error) {
      apiLogger.error("Error creating post", { error: String(error) });
    }
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const content = formData.get("trpc-message") as string;

    if (!content.trim()) return;

    try {
      await submitMessage.mutateAsync({ content });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      apiLogger.error("Error submitting message", { error: String(error) });
    }
  };

  return (
    <div className="border-t pt-6">
      <h2 className="mb-4 font-sans text-lg font-semibold text-gray-800">
        tRPC API Examples
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        These examples demonstrate client-side tRPC usage with queries and
        mutations.
      </p>

      <div className="space-y-6">
        {/* Custom Message Router */}
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Custom Message Submission (tRPC)
            <span className="ml-2 rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
              Custom
            </span>
          </h3>
          <p className="mb-3 text-xs text-gray-500">
            This uses a custom message router to demonstrate tRPC mutations with
            console logging.
          </p>
          <form onSubmit={handleSubmitMessage} className="space-y-3">
            <textarea
              name="trpc-message"
              rows={3}
              placeholder="Enter message via tRPC..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              required
            />
            <Button
              type="submit"
              size="sm"
              variant="primary"
              loading={submitMessage.isPending}
            >
              {submitMessage.isPending ? "Submitting..." : "Submit via tRPC"}
            </Button>
          </form>
          {submitMessage.data && (
            <div className="mt-2 rounded-md bg-purple-50 p-3 text-sm text-purple-700">
              ✅ {submitMessage.data.message}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t pt-4">
          <h4 className="mb-4 text-sm font-medium text-gray-600">
            Built-in T3 Stack Examples
            <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              T3 Built-in
            </span>
          </h4>
          <p className="mb-4 text-xs text-gray-500">
            The examples below showcase the default tRPC procedures that come
            with the T3 stack.
          </p>

          <div className="space-y-6">
            {/* Secret Message Query */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Protected Query (getSecretMessage)
              </h3>
              <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
                {secretMessage ?? "Loading..."}
              </div>
            </div>

            {/* Hello Query */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Public Query (hello)
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter text for hello query..."
                  value={helloText}
                  onChange={(e) => setHelloText(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                {helloResponse && (
                  <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
                    {helloResponse.greeting}
                  </div>
                )}
              </div>
            </div>

            {/* Create Post Mutation */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Create Post Mutation
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter post name..."
                  value={postName}
                  onChange={(e) => setPostName(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="success"
                  disabled={!postName.trim()}
                  loading={createPost.isPending}
                >
                  {createPost.isPending ? "Creating..." : "Create Post"}
                </Button>
              </form>
            </div>

            {/* Latest Post Display */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Latest Post (getLatest)
              </h3>
              <div className="rounded-md bg-gray-50 p-3 text-sm">
                {latestPost ? (
                  <div>
                    <p>
                      <strong>Name:</strong> {latestPost.name}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {latestPost.createdAt.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No posts yet. Create one above!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
