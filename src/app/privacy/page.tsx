import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy · JP Addison",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-6 font-sans text-4xl font-bold text-[#71eeb8]">
          Privacy policy
        </h1>

        <div className="space-y-4 text-base leading-relaxed text-gray-800">
          <p>
            This covers <strong>JPA GDoc CLI (personal)</strong>, a Google OAuth
            app that JP Addison uses to run the open-source{" "}
            <a
              href="https://github.com/LucaDeLeo/gdoc"
              className="text-blue-600 underline hover:text-blue-800"
            >
              gdoc
            </a>{" "}
            command-line tool against his own Google accounts. It is not offered
            to anyone else.
          </p>

          <p>
            When JP runs a command, the app reads or edits Google Docs and
            Google Drive files in the signed-in account. Sign-in tokens and
            document contents stay on his computer and go only to Google&apos;s
            APIs. Document contents may also be shown to AI assistants that JP
            runs under his own accounts.
          </p>

          <p>
            No data is sold, shared with anyone else, or used for advertising.
            Use of information received from Google APIs follows the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Google API Services User Data Policy
            </a>
            , including its Limited Use requirements.
          </p>

          <p>
            Questions? Reach JP through the links on the{" "}
            <Link
              href="/"
              className="text-blue-600 underline hover:text-blue-800"
            >
              home page
            </Link>
            .
          </p>

          <p className="text-sm text-gray-500">
            Last updated October 14, 2026. Drafted by Claude (AI) for JP
            Addison.
          </p>
        </div>
      </div>
    </main>
  );
}
