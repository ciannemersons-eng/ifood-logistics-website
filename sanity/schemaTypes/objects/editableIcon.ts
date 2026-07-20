import { defineField, defineType } from "sanity";

// Keep this list in sync with iconMap in src/lib/icons/iconMap.ts — every
// key here must also exist there (and vice versa) or the icon picked in
// Studio won't actually render on the site.
const ICON_KEYS = [
  // Storage & warehousing
  "warehouse", "boxes", "box", "package", "packageCheck", "packageOpen",
  "packagePlus", "packageMinus", "packageX", "packageSearch", "container",
  "archive", "archiveRestore", "layers",

  // Temperature & climate
  "snowflake", "thermometerSnowflake", "thermometer", "thermometerSun",
  "wind", "sun", "cloud", "cloudRain", "cloudSnow", "droplet", "droplets",

  // Security
  "shieldCheck", "shield", "shieldAlert", "lock", "lockKeyhole", "unlock",
  "key", "eye", "camera", "fingerprint", "scanFace",

  // Transportation & logistics
  "truck", "ship", "plane", "train", "bus", "car", "forklift", "anchor",
  "navigation", "compass", "mapPin", "map", "globe", "route", "fuel",

  // Power & utilities
  "plugZap", "plug", "batteryCharging", "battery", "zap", "power", "gauge",
  "cpu",

  // Doors & access
  "doorOpen", "doorClosed", "logIn", "logOut",

  // Documents & records
  "clipboardList", "clipboardCheck", "clipboardX", "clipboard", "fileText",
  "fileCheck", "database", "barChart", "lineChart", "pieChart", "trendingUp",
  "trendingDown", "calculator",

  // Time & scheduling
  "calendarClock", "calendar", "calendarCheck", "calendarDays", "clock",
  "timer", "history", "alarmClock",

  // Tools & industry
  "wrench", "hammer", "cog", "settings", "hardHat", "ruler", "factory",
  "building2", "building", "home", "landmark", "recycle", "leaf", "treePine",

  // Food & industries served
  "utensils", "utensilsCrossed", "fish", "beef", "egg", "apple", "carrot",
  "coffee", "wine", "salad", "pizza", "soup", "milk", "hotel", "store",
  "shoppingCart", "shoppingBag",

  // People & business
  "users", "user", "userCheck", "usersRound", "briefcase", "handshake",

  // Finance
  "dollarSign", "creditCard", "wallet", "banknote", "receipt", "piggyBank",

  // Status & feedback
  "checkCircle2", "checkCircle", "xCircle", "alertCircle", "alertTriangle",
  "info", "helpCircle", "star", "award", "medal", "trophy", "target", "flag",
  "badgeCheck",

  // Communication
  "phone", "phoneCall", "mail", "messageCircle", "messageSquare", "send",

  // Navigation & UI
  "arrowRight", "arrowLeft", "arrowUp", "arrowDown", "chevronRight",
  "chevronLeft", "externalLink", "link", "checkSquare", "square", "circle",
  "hexagon",
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
