import React from "react";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BlogListingSection } from "@/components/sections/BlogListingSection";

const Blog = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Approved customer-facing branding (11/24/2026). Passed explicitly so the
            first render never falls back to the generic "Blog" page name. */}
        <BlogListingSection
          pageId="blog"
          variant="page"
          eyebrow=""
          heading="Appraisal Insights"
          intro="Expert Insights and Real Estate Valuation News"
        />
      </main>
      <Footer />
    </div>
  );
});

Blog.displayName = "Blog";

export default Blog;
