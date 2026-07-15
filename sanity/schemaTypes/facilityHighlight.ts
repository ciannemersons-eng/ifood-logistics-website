import { defineField, defineType } from "sanity";

export default defineType({
  name: "facilityHighlight",
  title: "Facility Highlight",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "technicalValue", title: "Technical value", type: "string" }),
    defineField({ name: "image", title: "Image", type: "editableImage" }),
    defineField({ name: "icon", title: "Icon", type: "editableIcon" }),
    defineField({ name: "link", title: "Optional link", type: "string" }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "technicalValue" } },
});
