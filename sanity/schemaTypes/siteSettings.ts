import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyLegalName", title: "Official company legal name", type: "string" }),
    defineField({ name: "tradingName", title: "Trading name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "editableImage" }),
    defineField({
      name: "logoWhite",
      title: "Logo (white version for footer)",
      description:
        "Used in the footer, which has a dark blue background. Upload a white or light-colored version of the logo here. If left empty, the main logo above is reused.",
      type: "editableImage",
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "socialLinks", title: "Social links", type: "array", of: [{ type: "cta" }] }),
    defineField({ name: "inquiryRecipientEmail", title: "Form recipient email address", type: "string" }),
    defineField({ name: "headerCta", title: "Header CTA", type: "cta" }),
    defineField({ name: "footerText", title: "Footer text", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "Default SEO metadata", type: "seoMetadata" }),
  ],
  preview: { select: { title: "tradingName" } },
});
