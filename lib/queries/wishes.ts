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

 const { data, error } = await supabase
  .from("wishes")
  .select("*")
  .order("created_at", {
    ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}