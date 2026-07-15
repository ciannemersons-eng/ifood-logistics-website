import { defineField, defineType } from "sanity";

const sectionBase = [
  defineField({ name: "isVisible", title: "Show section", type: "boolean", initialValue: true }),
  defineField({ name: "anchorId", title: "Section anchor ID", type: "string" }),
  defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
  defineField({ name: "heading", title: "Heading", type: "text", rows: 2 }),
  defineField({ name: "supportingCopy", title: "Supporting copy", type: "text", rows: 3 }),
];

export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  fields: [
    defineField({
      name: "navItems",
      title: "Navigation items",
      type: "array",
      of: [{ type: "cta" }],
    }),

    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "headlineLine1", title: "Headline line 1", type: "string" }),
        defineField({ name: "headlineLine2", title: "Headline line 2", type: "string" }),
        defineField({ name: "primaryCta", title: "Primary CTA", type: "cta" }),
        defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
        defineField({ name: "image", title: "Hero image", type: "editableImage" }),
        defineField({
          name: "textAlign",
          title: "Text alignment",
          type: "string",
          options: { list: [{ title: "Left", value: "left" }, { title: "Center", value: "center" }] },
          initialValue: "left",
        }),
        defineField({
          name: "overlayStrength",
          title: "Overlay strength",
          type: "string",
          options: { list: ["none", "light", "medium", "strong"].map((v) => ({ title: v, value: v })) },
          initialValue: "light",
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Floating Statistics Panel",
      type: "object",
      fields: [
        defineField({ name: "isVisible", title: "Show section", type: "boolean", initialValue: true }),
        defineField({ name: "stats", title: "Statistics", type: "array", of: [{ type: "statistic" }] }),
      ],
    }),

    defineField({
      name: "solutions",
      title: "Solutions Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "sectionLink", title: "Section link", type: "cta" }),
        defineField({
          name: "cards",
          title: "Service cards",
          type: "array",
          of: [{ type: "reference", to: [{ type: "service" }] }],
        }),
      ],
    }),

    defineField({
      name: "about",
      title: "About Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "bodyCopy", title: "Body copy", type: "text", rows: 6 }),
        defineField({ name: "trustPoints", title: "Trust points", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "cta", title: "CTA", type: "cta" }),
        defineField({ name: "image", title: "Image", type: "editableImage" }),
        defineField({ name: "floatingCardEyebrow", title: "Floating card eyebrow", type: "string" }),
        defineField({ name: "floatingCardText", title: "Floating card text", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "facility",
      title: "Facility Highlights Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "introCopy", title: "Introduction", type: "text", rows: 3 }),
        defineField({
          name: "highlights",
          title: "Facility highlights",
          type: "array",
          of: [{ type: "reference", to: [{ type: "facilityHighlight" }] }],
        }),
      ],
    }),

    defineField({
      name: "inventory",
      title: "Inventory Visibility Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "copy", title: "Copy", type: "text", rows: 4 }),
        defineField({ name: "benefits", title: "Benefits", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "cta", title: "CTA", type: "cta" }),
        defineField({ name: "image", title: "Image", type: "editableImage" }),
      ],
    }),

    defineField({
      name: "whyIfood",
      title: "Why iFood Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({
          name: "items",
          title: "Benefit items",
          type: "array",
          of: [{
            type: "object",
            name: "whyIfoodItem",
            fields: [
              defineField({ name: "icon", title: "Icon", type: "editableIcon" }),
              defineField({ name: "title", title: "Title", type: "string" }),
              defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              defineField({ name: "isVisible", title: "Visible", type: "boolean", initialValue: true }),
              defineField({ name: "sortOrder", title: "Sort order", type: "number" }),
            ],
          }],
        }),
      ],
    }),

    defineField({
      name: "industries",
      title: "Industries Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({
          name: "industries",
          title: "Industries",
          type: "array",
          of: [{ type: "reference", to: [{ type: "industry" }] }],
        }),
      ],
    }),

    defineField({
      name: "process",
      title: "Storage Process Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({
          name: "steps",
          title: "Process steps",
          type: "array",
          of: [{ type: "reference", to: [{ type: "processStep" }] }],
        }),
        defineField({ name: "cta", title: "CTA", type: "cta" }),
      ],
    }),

    defineField({
      name: "partners",
      title: "Partners Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({
          name: "partners",
          title: "Partners",
          type: "array",
          of: [{ type: "reference", to: [{ type: "partner" }] }],
        }),
        defineField({ name: "legalCaption", title: "Legal caption", type: "string" }),
      ],
    }),

    defineField({
      name: "affiliates",
      title: "Affiliates Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "copy", title: "Copy", type: "text", rows: 4 }),
        defineField({
          name: "affiliates",
          title: "Affiliates",
          type: "array",
          of: [{ type: "reference", to: [{ type: "affiliate" }] }],
        }),
      ],
    }),

    defineField({
      name: "expansion",
      title: "Expansion Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "copy", title: "Copy", type: "text", rows: 4 }),
        defineField({ name: "cta", title: "CTA", type: "cta" }),
      ],
    }),

    defineField({
      name: "inquiry",
      title: "Inquiry Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({ name: "copy", title: "Copy", type: "text", rows: 3 }),
        defineField({ name: "reassurancePoints", title: "Reassurance points", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "submitLabel", title: "Submit button label", type: "string" }),
        defineField({ name: "reassuranceCopy", title: "Reassurance copy", type: "string" }),
        defineField({ name: "successMessage", title: "Success message", type: "text", rows: 2 }),
        defineField({ name: "errorMessage", title: "Error message", type: "text", rows: 2 }),
      ],
    }),

    defineField({
      name: "faq",
      title: "FAQ Section",
      type: "object",
      fields: [
        ...sectionBase,
        defineField({
          name: "items",
          title: "FAQ items",
          type: "array",
          of: [{ type: "reference", to: [{ type: "faqItem" }] }],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Landing Page Content" };
    },
  },
});
