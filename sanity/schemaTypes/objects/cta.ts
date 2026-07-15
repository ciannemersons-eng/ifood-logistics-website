import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "Link (URL or #anchor)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
  ],
});
