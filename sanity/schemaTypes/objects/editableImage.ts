import { defineField, defineType } from "sanity";

export default defineType({
  name: "editableImage",
  title: "Editable Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "alt", title: "Alternative text", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "mobileImage", title: "Optional mobile image", type: "image", options: { hotspot: true } }),
    defineField({ name: "darkOverlay", title: "Dark overlay", type: "boolean", initialValue: false }),
    defineField({ name: "credit", title: "Image credit", type: "string" }),
    defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
  ],
});
