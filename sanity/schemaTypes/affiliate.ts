import { defineField, defineType } from "sanity";

export default defineType({
  name: "affiliate",
  title: "Affiliate",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Optional logo", type: "editableImage" }),
    defineField({
      name: "approvedForPublication",
      title: "Approved for publication",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name" } },
});
