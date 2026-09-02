import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Change them to Studios, Tutorials, Expeditions, etc.
export const sessionLabels = {
  singular: "Session",
  plural: "Sessions",
} as const;

// Same destinations as the top nav's `links`, reused as the left-hand
// sidebar so wayfinding is consistent whichever one a visitor notices first.
// `collection`, when set, tells AppSidebar which content collection to list
// underneath the section as expandable items.
export const sidebarSections: {
  title: string;
  href: string;
  collection?: "sessions" | "lectures" | "assessments" | "people";
  icon: string;
  /** Render a divider after this section, grouping it apart from what follows. */
  dividerAfter?: boolean;
}[] = [
  { title: "Home", href: "/", icon: "home", dividerAfter: true },
  { title: "Lectures", href: "/lectures/", collection: "lectures", icon: "book" },
  {
    title: sessionLabels.plural,
    href: "/sessions/",
    collection: "sessions",
    icon: "presentation",
    dividerAfter: true,
  },
  { title: "Assessment", href: "/assessments/", collection: "assessments", icon: "task-list" },
  { title: "People", href: "/people/", icon: "group" },
  { title: "Policies", href: "/policies/", icon: "shield-check" },
];

export const graphCollections = ["sessions", "assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",
  colorScheme: "light",

  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/card.png",
  socialImageAlt: `A preview card for ${courseMeta.code}: ${courseMeta.title}`,
});
