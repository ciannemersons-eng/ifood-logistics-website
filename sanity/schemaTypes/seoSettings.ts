import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({ name: "seo", title: "SEO metadata", type: "seoMetadata" }),
  ],
});
