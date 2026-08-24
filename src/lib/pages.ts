export type PageId = "welcome" | "cake" | "letter" | "reasons" | "finale";

export type PageMeta = {
  id: PageId;
  label: string;
  emoji: string;
};

export const PAGES: PageMeta[] = [
  { id: "welcome", label: "Welcome", emoji: "🎀" },
  { id: "cake", label: "Make a Wish", emoji: "🎂" },
  { id: "letter", label: "A Letter", emoji: "💌" },
  { id: "reasons", label: "Reasons", emoji: "🌟" },
  { id: "finale", label: "Your Surprise", emoji: "🎁" },
];
