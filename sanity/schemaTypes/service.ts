import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Solution / Service Card",
  type: "document",
  fields: [
    defineField({ name: "icon", title: "Icon", type: "editableIcon" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "link", title: "Optional link", type: "string" }),
    defineField({ name: "accentBackground", title: "Pale accent background behind icon", type: "boolean", initialValue: true }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "description" } },
});
