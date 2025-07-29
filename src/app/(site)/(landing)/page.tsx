import BtnLinkPrimary from "@/components/btn-link-primary";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="">
      <MaxWidthWrapper className="flex flex-col items-center gap-y-4 mb-5">
        <h1 className="text-6xl sm:self-end text-center font-patrick">
          Convert <span className="text-green-500">Any</span> Data Into <br />
          <span className="text-red-700">JSON</span> Structure
        </h1>
        <p className="text-lg text-center max-w-5xl w-full text-slate-700">
          Easily transform unstructured or messy data into a clean, valid JSON
          format. Perfect for developers, analysts, and automation workflows.
        </p>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="font-patrick mb-4">
        <div className="flex gap-6 w-full justify-center items-center max-[480]:flex-col">
          <BtnLinkPrimary
            href="/playground"
            variant="green"
            className="max-[480]:w-full"
          >
            Try It Now!
          </BtnLinkPrimary>
          <BtnLinkPrimary
            href="/apidocs"
            variant="red"
            className="flex gap-1 max-[480]:w-full items-center justify-center"
          >
            See The Api <ArrowRight />
          </BtnLinkPrimary>
        </div>
      </MaxWidthWrapper>

      <section className="w-full flex items-center justify-center">
        <Image
          src={"/images/desktop-flow.png"}
          alt="Desktop Flow Image"
          width={1051}
          height={508}
          className="w-[980px]"
        />
      </section>
    </div>
  );
}
