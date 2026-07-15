import { defineField, defineType } from "sanity";

export default defineType({
  name: "processStep",
  title: "Storage Process Step",
  type: "document",
  fields: [
    defineField({ name: "stepNumber", title: "Step number", type: "number", validation: (Rule) => Rule.required().min(1) }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Step number", name: "stepNumberAsc", by: [{ field: "stepNumber", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "stepNumber" } },
});
