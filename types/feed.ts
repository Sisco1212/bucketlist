import type { Wish } from "./wish";

export type FeedWish = Wish & {
  profiles: {
    username: string;
  };
wish_cheers: {
  user_id: string;
}[];
};