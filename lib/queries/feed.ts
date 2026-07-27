import { createSupabaseServerClient } from "@/lib/server";

export async function getPublicWishes(
  currentUserId: string | null
) {
  const supabase = await createSupabaseServerClient();

  const { data: wishes, error } = await supabase
    .from("wishes")
    .select(`
      *,
      profiles (
        username
      ),
      wish_cheers (
        user_id
      )
    `)
    .eq("is_public", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  const safeWishes = wishes ?? [];

  let copiedIdsByUser = new Set();

if (currentUserId) {
  const { data: copiedWishes } = await supabase
    .from("wishes")
    .select("copied_from")
    .eq("user_id", currentUserId);

  copiedIdsByUser = new Set(
    copiedWishes
      ?.map((wish) => wish.copied_from)
      .filter(Boolean)
  );
}

  const copiedIds = safeWishes
    .map((wish) => wish.copied_from)
    .filter(Boolean);


if (copiedIds.length === 0) {
return safeWishes.map((wish) => ({
  ...wish,
  hasCopied: copiedIdsByUser.has(wish.id),
  isOwner: wish.user_id === currentUserId,
  inspiredBy: null,
}));
}


const { data: originals, error: originalsError } =
  await supabase
    .from("wishes")
    .select(`
      id,
      profiles (
        username
      )
    `)
    .in("id", copiedIds) as {
      data: {
        id: string;
        profiles: {
          username: string;
        } | null;
      }[] | null;
      error: any;
    };


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
  hasCopied: copiedIdsByUser.has(wish.id),
  isOwner: wish.user_id === currentUserId,
  inspiredBy: wish.copied_from
    ? originalMap.get(wish.copied_from) ?? null
    : null,
}));
}