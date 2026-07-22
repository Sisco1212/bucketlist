
import FeedCard from "@/components/ui/FeedCard"
import { getPublicWishes } from "@/lib/queries/feed"
// import type { FeedWish } from "@/types/feed";


export default async function FeedPage() {
 
  const wishes = await getPublicWishes();

if (wishes.length === 0) {
    return (
      <p>
        Your bucket list is empty.
      </p>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Public Bucket List
      </h1>
      <div className="space-y-4">
  {wishes.map((wish) => (
    <FeedCard
      key={wish.id}
      wish={wish}
    />
  ))}
</div>
    </main>
  );
}