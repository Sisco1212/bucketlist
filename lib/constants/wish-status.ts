export const WISH_STATUS_VALUES = [
  "dreaming",
  "planning",
  "in_progress",
  "paused",
  "fulfilled",
  "abandoned",
] as const;

export const WISH_STATUSES = [
  {
    value: "dreaming",
    label: "Dreaming",
    emoji: "🌱",
  },
  {
    value: "planning",
    label: "Planning",
    emoji: "🛠️",
  },
  {
    value: "in_progress",
    label: "In Progress",
    emoji: "🚀",
  },
  {
    value: "paused",
    label: "Paused",
    emoji: "⏸️",
  },
  {
    value: "fulfilled",
    label: "Fulfilled",
    emoji: "🎉",
  },
  {
    value: "abandoned",
    label: "Abandoned",
    emoji: "🚫",
  },
] as const;

export type WishStatus = typeof WISH_STATUSES[number]["value"];