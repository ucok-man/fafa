import { ArrowRight } from "lucide-react";
import Image from "next/image";

import BtnLinkPrimary from "@/components/btn-link-primary";
import MaxWidthWrapper from "@/components/max-width-wrapper";

// Define constants for links and images to improve maintainability.
const CTA_LINKS = {
  playground: "/playground",
  apiDocs: "/apidocs",
};

const SHOWCASE_IMAGES = {
  desktop: {
    src: "/images/desktop-flow.png",
    alt: "An illustration showing the data conversion flow on a desktop interface.",
  },
  mobile: {
    src: "/images/phone-flow.png",
    alt: "An illustration showing the data conversion flow on a mobile interface.",
  },
};

export default function HomePage() {
  return (
    <main className="py-8 md:py-12">
      {/* Hero and Call-to-Action Section */}
      <MaxWidthWrapper className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-patrick sm:text-6xl">
          Convert <span className="text-green-500">Any</span> Data Into <br />
          <span className="text-red-700">JSON</span> Structure
        </h1>
        <p className="mt-5 max-w-4xl text-base text-slate-700 lg:text-lg">
          Easily transform unstructured or messy data into a clean, valid JSON
          format. Perfect for developers, data analysts, and automation
          workflows.
        </p>
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 font-patrick sm:w-auto sm:flex-row sm:gap-6">
          <BtnLinkPrimary
            href={CTA_LINKS.playground}
            variant="green"
            className="w-full text-lg! sm:w-auto md:text-xl!"
          >
            Playground
          </BtnLinkPrimary>
          <BtnLinkPrimary
            href={CTA_LINKS.apiDocs}
            variant="red"
            className="flex w-full items-center justify-center gap-1 text-lg! sm:w-auto md:text-xl!"
          >
            API Docs <ArrowRight className="h-5 w-5" />
          </BtnLinkPrimary>
        </div>
      </MaxWidthWrapper>

      {/* Product Visual Showcase Section */}
      <section className="mt-16 sm:mt-20">
        <MaxWidthWrapper className="flex justify-center">
          {/* Desktop Image: Visible on sm screens and up */}
          <Image
            src={SHOWCASE_IMAGES.desktop.src}
            alt={SHOWCASE_IMAGES.desktop.alt}
            width={1051}
            height={508}
            quality={100}
            className="hidden md:block"
          />
          {/* Mobile Image: Visible below sm screens */}
          <Image
            src={SHOWCASE_IMAGES.mobile.src}
            alt={SHOWCASE_IMAGES.mobile.alt}
            width={336}
            height={343}
            quality={100}
            className="block md:hidden"
          />
        </MaxWidthWrapper>
      </section>
    </main>
  );
}
