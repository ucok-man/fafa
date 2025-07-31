import BtnLinkPrimary from "@/components/btn-link-primary";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="">
      <MaxWidthWrapper className="flex flex-col items-center gap-y-4 mb-5">
        <h1 className="text-5xl lg:text-6xl sm:self-end text-center font-patrick">
          Convert <span className="text-green-500">Any</span> Data Into <br />
          <span className="text-red-700">JSON</span> Structure
        </h1>
        <p className="text-base lg:text-lg text-center max-w-5xl w-full text-slate-700">
          Easily transform unstructured or messy data into a clean, valid JSON
          format. Perfect for developers, analysts, and automation workflows.
        </p>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="font-patrick mb-4">
        <div className="flex gap-6 w-full justify-center items-center max-[380]:flex-col">
          <BtnLinkPrimary
            href="/playground"
            variant="green"
            className="max-[380]:w-full max-lg:text-xl!"
          >
            Try It Now!
          </BtnLinkPrimary>
          <BtnLinkPrimary
            href="/apidocs"
            variant="red"
            className="flex gap-1 max-[380]:w-full items-center justify-center max-lg:text-xl!"
          >
            See The Api <ArrowRight />
          </BtnLinkPrimary>
        </div>
      </MaxWidthWrapper>

      <section className="w-full hidden sm:flex items-center justify-center">
        <Image
          src={"/images/desktop-flow.png"}
          alt="Desktop Flow Image"
          width={1051}
          height={508}
          className=""
        />
      </section>

      <section className="w-full items-center justify-center flex sm:hidden">
        <Image
          src={"/images/phone-flow.png"}
          alt="Desktop Flow Image"
          width={336}
          height={343}
          className=""
        />
      </section>
    </div>
  );
}
