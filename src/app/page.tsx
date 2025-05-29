import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 font-serif">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h1 className="font-sans text-4xl font-bold text-[#71eeb8] md:text-5xl">
              JP Addison
            </h1>
            
            <p className="text-lg leading-relaxed text-gray-800">
              is a technologist and{" "}
              <a 
                href="https://www.effectivealtruism.org/articles/introduction-to-effective-altruism/"
                className="text-[#f50057] hover:underline"
              >
                effective altruist
              </a>
              .
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              I am the head of the Online Team at the{" "}
              <a 
                href="https://www.centreforeffectivealtruism.org/"
                className="text-[#f50057] hover:underline"
              >
                Centre for Effective Altruism
              </a>
              . I help run the{" "}
              <a 
                href="https://forum.effectivealtruism.org/"
                className="text-[#f50057] hover:underline"
              >
                Effective Altruism Forum
              </a>
              .
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              You can find me elsewhere at{" "}
              <a 
                href="https://github.com/jpaddison3"
                className="text-[#f50057] hover:underline"
              >
                github
              </a>
              {" "}or{" "}
              <a 
                href="https://www.linkedin.com/in/jpaddison3/"
                className="text-[#f50057] hover:underline"
              >
                linkedin
              </a>
              .
            </p>

            <p className="text-lg leading-relaxed text-gray-800">
              You can get in touch with me via{" "}
              <a 
                href="mailto:johnpaddison@gmail.com"
                className="text-[#f50057] hover:underline"
              >
                email
              </a>
              {" "}or professionally via my{" "}
              <a 
                href="mailto:jp@centreforeffectivealtruism.org"
                className="text-[#f50057] hover:underline"
              >
                work email
              </a>
              .
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src="https://res.cloudinary.com/jpaddison/image/upload/v1600099735/jp-profile.jpg"
              alt="profile image"
              width={160}
              height={160}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
