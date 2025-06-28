import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          <div className="md:col-span-2">
            <h1 className="mb-2 font-sans text-[60px] font-bold text-[#71eeb8]">
              JP Addison
            </h1>

            <div className="space-y-4">
              <p className="text-base leading-relaxed text-gray-800">
                is a technologist and{" "}
                <a
                  href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism/"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  effective altruist
                </a>
                .
              </p>

              <p className="text-base leading-relaxed text-gray-800">
                I am an AI Systems Specialist{" "}
                <a
                  href="https://80000hours.org/"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  80000 Hours
                </a>
                . I try to help us provide better career advice by using LLMs to
                improve our products.
              </p>

              <p className="text-base leading-relaxed text-gray-800">
                Previously I cofounded the{" "}
                <a
                  href="https://forum.effectivealtruism.org/"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  EA Forum 2.0.
                </a>
              </p>

              <p className="text-base leading-relaxed text-gray-800">
                You can find me elsewhere at{" "}
                <a
                  href="https://github.com/jpaddison3"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  github
                </a>{" "}
                or{" "}
                <a
                  href="https://www.linkedin.com/in/jpaddison3/"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  linkedin
                </a>
                , and you can get in touch with me via{" "}
                <a
                  href="mailto:johnpaddison@gmail.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  email
                </a>{" "}
                or professionally via my{" "}
                <a
                  href="mailto:jp.addison@80000hours.org"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  work email
                </a>
                .
              </p>
            </div>
          </div>

          <div className="flex justify-center md:justify-center">
            <Image
              src="https://res.cloudinary.com/jpaddison/image/upload/v1748533766/gwwc-headshot-small_cvk8r5.jpg"
              alt="profile image"
              width={160}
              height={160}
              className="h-40 w-40 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
