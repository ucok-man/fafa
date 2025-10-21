import BtnLinkPrimary from "@/components/btn-link-primary";
import { ArrowRight } from "lucide-react";
import SectionWrapper from "./section-wrapper";

export default function SectionOverview() {
  return (
    <SectionWrapper title="Overview" id="overview">
      <div className="space-y-6">
        <p className="text-base text-slate-700 leading-relaxed">
          Fafa API uses advanced AI to transform unstructured text into
          structured JSON objects based on your specified schema. Perfect for
          extracting structured data from any text content.
        </p>

        <BtnLinkPrimary
          href="/playground"
          variant="green"
          className="flex gap-1 max-[480]:w-full items-center justify-center font-patrick max-sm:py-2 text-xl! max-sm:text-2xl! min-[480px]:w-fit"
        >
          Go to playground <ArrowRight />
        </BtnLinkPrimary>
      </div>
    </SectionWrapper>
  );
}
