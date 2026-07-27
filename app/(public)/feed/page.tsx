import FeedList from "@/components/ui/FeedList";
import { getPublicWishes } from "@/lib/queries/feed";
import { createSupabaseServerClient } from "@/lib/server";

export default async function FeedPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const wishes = await getPublicWishes(user?.id ?? null);

  if (wishes.length === 0) {
    return (
      <p>
        No public wishes yet.
      </p>
    );
  }

  return (
   <>
   
   <FeedList
      wishes={wishes}
      currentUserId={user?.id ?? null}
    />
    <pre>{JSON.stringify(wishes, null, 2)}</pre>
   </> 
    
  );
}