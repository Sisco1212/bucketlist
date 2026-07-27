import { unstable_noStore as noStore } from "next/cache";
import { createSupabaseServerClient } from "@/lib/server";

export async function getWishes() {
  noStore();

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Get the current user's wishes
  const { data: wishes, error } = await supabase
    .from("wishes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  const safeWishes = wishes ?? [];

  // Get all copied wish IDs
  const copiedIds = safeWishes
    .map((wish) => wish.copied_from)
    .filter(Boolean);

  if (copiedIds.length === 0) {
    return safeWishes.map((wish) => ({
      ...wish,
      inspiredBy: null,
    }));
  }

  // Fetch the original wishes
  const { data: originals, error: originalsError } =
  await supabase
    .from("wishes")
    .select(`
      id,
      user_id,
      profiles (
        username
      )
    `)
    .in("id", copiedIds) as {
      data: {
        id: string;
        user_id: string;
        profiles: {
          username: string;
        } | null;
      }[] | null;
      error: any;
    };

      console.log(JSON.stringify(originals, null, 2));

  if (originalsError) {
    console.error(originalsError);

    return safeWishes.map((wish) => ({
      ...wish,
      inspiredBy: null,
    }));
  }

const originalMap = new Map(
  (originals ?? []).map((wish) => [
    wish.id,
    wish.profiles?.username ?? null,
  ])
);

  return safeWishes.map((wish) => ({
    ...wish,
    inspiredBy: wish.copied_from
      ? originalMap.get(wish.copied_from) ?? null
      : null,
  }));
}