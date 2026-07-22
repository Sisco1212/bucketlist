import type { FeedWish } from "@/types/feed";

type FeedCardProps = {
  wish: FeedWish;
};

export default function FeedCard({
  wish,
}: FeedCardProps) {
    
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <p className="text-sm text-gray-500">
        @{wish.profiles.username}
      </p>

      <h2 className="text-xl font-semibold">
        {wish.title}
      </h2>

      {wish.description && (
        <p>{wish.description}</p>
      )}

      <p>{wish.status}</p>
    </div>
  );
}