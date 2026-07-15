import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
