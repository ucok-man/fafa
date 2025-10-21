"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import NavigationSidebar from "./navigation-sidebar";
import SectionEndpoint from "./section-endpoint";
import SectionError from "./section-error";
import SectionExample from "./section-examples";
import SectionOverview from "./section-overview";
import SectionSchema from "./section-schema";

export default function ApidocsPage() {
  return (
    <div>
      <MaxWidthWrapper className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 relative ">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <NavigationSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview */}
            <SectionOverview />

            {/* Main Endpoint */}
            <SectionEndpoint />

            {/* Examples */}
            <SectionExample />

            {/* Error Codes */}
            <SectionError />

            {/* Schema Format */}
            <SectionSchema />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
