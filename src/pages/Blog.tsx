import React from "react";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BlogListingSection } from "@/components/sections/BlogListingSection";

const Blog = React.forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BlogListingSection
          pageId="blog"
          variant="page"
        />
      </main>
      <Footer />
    </div>
  );
});

Blog.displayName = "Blog";

export default Blog;
