import type { ActionState } from "./auth";
import type { WishStatus } from "@/lib/constants/wish-status";

export type WishState = ActionState<{
  title?: string[];
  description?: string[];
}>;

export interface Wish {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status:WishStatus;
  created_at: string;
  updated_at: string;
}