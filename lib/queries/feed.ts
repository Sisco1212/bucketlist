import { createSupabaseServerClient } from "@/lib/server";


export async function getPublicWishes() {

 const supabase = await createSupabaseServerClient();

  const { data: wishes, error } = await supabase
    .from("wishes")
.select(`
  *,
  profiles (
    username
  ),
  wish_cheers!wish_cheers_wish_id_fkey (
    user_id
  )
`)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (error) {
    if (error) {
    console.error(error);
    return [];
  }
  }

  return wishes

}