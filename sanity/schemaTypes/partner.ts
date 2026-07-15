import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "editableImage" }),
    defineField({ name: "website", title: "Optional website", type: "url" }),
    defineField({ name: "relationshipDescription", title: "Optional relationship description", type: "text", rows: 2 }),
    defineField({
      name: "approvedForPublication",
      title: "Approved for publication",
      description: "Do not enable until company management has confirmed permission to display this name or logo.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
  ],
  orderings: [{ title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "name", approved: "approvedForPublication", visible: "isVisible" },
    prepare({ title, approved, visible }) {
      return { title, subtitle: approved && visible ? "Published" : "Not published" };
    },
  },
});
