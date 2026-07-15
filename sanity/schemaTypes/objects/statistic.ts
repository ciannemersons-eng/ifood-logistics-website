import { defineField, defineType } from "sanity";

export default defineType({
  name: "statistic",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "icon", title: "Icon", type: "editableIcon" }),
  ],
});
