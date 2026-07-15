import { defineField, defineType } from "sanity";

const ICON_KEYS = [
  "warehouse","snowflake","packageCheck","container","shieldCheck","truck",
  "thermometerSnowflake","database","plugZap","doorOpen","clipboardList",
  "calendarClock","clipboardCheck","boxes","building2","ruler","doorClosed",
  "factory","recycle","batteryCharging","camera","utensils","hotel",
  "shoppingCart","building","fish","mapPin","phone","mail","arrowRight",
];

export default defineType({
  name: "editableIcon",
  title: "Editable Icon",
  type: "object",
  fields: [
    defineField({
      name: "mode",
      title: "Icon source",
      type: "string",
      options: { list: [
        { title: "Library icon", value: "library" },
        { title: "Uploaded file", value: "upload" },
      ] },
      initialValue: "library",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "libraryKey",
      title: "Library icon",
      type: "string",
      options: { list: ICON_KEYS.map((key) => ({ title: key, value: key })) },
      hidden: ({ parent }) => parent?.mode !== "library",
    }),
    defineField({
      name: "uploadedAsset",
      title: "Uploaded icon (SVG or PNG)",
      type: "image",
      hidden: ({ parent }) => parent?.mode !== "upload",
    }),
    defineField({
      name: "uploadedAssetAlt",
      title: "Uploaded icon alt text",
      type: "string",
      hidden: ({ parent }) => parent?.mode !== "upload",
    }),
  ],
});
