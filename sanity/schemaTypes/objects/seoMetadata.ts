import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoMetadata",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", validation: (Rule) => Rule.max(70) }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (Rule) => Rule.max(160) }),
    defineField({ name: "socialImage", title: "Social-sharing image", type: "editableImage" }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
  ],
});
