import { defineField, defineType } from "sanity";

export default defineType({
  name: "sectionSettings",
  title: "Section Settings",
  type: "object",
  fields: [
    defineField({ name: "isVisible", title: "Show section", type: "boolean", initialValue: true }),
    defineField({ name: "anchorId", title: "Section anchor ID", type: "string" }),
    defineField({
      name: "theme",
      title: "Section theme",
      type: "string",
      options: { list: [
        { title: "White", value: "white" },
        { title: "Light blue", value: "lightBlue" },
        { title: "Dark blue", value: "darkBlue" },
      ] },
      initialValue: "white",
    }),
    defineField({ name: "eyebrow", title: "Eyebrow label", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "text", rows: 2 }),
    defineField({ name: "supportingCopy", title: "Supporting copy", type: "text", rows: 3 }),
  ],
});
