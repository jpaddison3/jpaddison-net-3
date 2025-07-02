import Link from "next/link";
import { auth, signOut } from "~/server/auth";

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export async function AuthStatus() {
  const session = await auth();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {session.user?.email ?? session.user?.name}
        </span>
        <form action={handleSignOut}>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Sign Out
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      Login
    </Link>
  );
}
