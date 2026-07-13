import type { ActionState } from "./auth";

export type WishState = ActionState<{
  title?: string[];
  description?: string[];
}>;