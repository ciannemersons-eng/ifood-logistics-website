import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactDetails",
  title: "Contact Details",
  type: "document",
  fields: [
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "mapUrl", title: "Map URL", type: "url" }),
  ],
});
