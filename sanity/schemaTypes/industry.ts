import { defineField, defineType } from "sanity";

export default defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Industry name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "icon", title: "Icon", type: "editableIcon" }),
    defineField({ name: "image", title: "Optional image", type: "editableImage" }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name" } },
});
