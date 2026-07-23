import FeedCard from "./FeedCard";
import type { FeedWish } from "@/types/feed";

type FeedListProps = {
  wishes: FeedWish[];
  currentUserId: string | null;
};

const FeedList = ({
  wishes,
  currentUserId,
}: FeedListProps) => {
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
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </main>
  );
};

export default FeedList;