import type { Wish } from "./wish";

export type FeedWish = Wish & {
  profiles: {
    username: string;
  };
};