"use client";
import type { FeedWish } from "@/types/feed";
import { useState } from "react";
import { toggleWishCheer } from "@/actions/wishes";
import { copyWish  } from "@/actions/wishes";


type FeedCardProps = {
  wish: FeedWish;
  currentUserId: string | null;
};

export default function FeedCard({
  wish,
  currentUserId,
}: FeedCardProps) {
    
const initialCheers = wish.wish_cheers ?? [];
  
const [cheerCount, setCheerCount] = useState(
  initialCheers.length
);

const [hasCheered, setHasCheered] = useState(
  initialCheers.some(
    (cheer) => cheer.user_id === currentUserId
  )
);

const [isUpdating, setIsUpdating] = useState(false);
const [copied, setCopied] = useState(false);

const [copying, setCopying] = useState(false);

const handleToggleCheer = async() => {
 const previousCheered = hasCheered;
const previousCount = cheerCount;

setIsUpdating(true);

if (hasCheered) {
  setHasCheered(false);
  setCheerCount((count) => count - 1);
} else {
  setHasCheered(true);
  setCheerCount((count) => count + 1);
}

try {
  const result = await toggleWishCheer(wish.id);

  if (!result.success) {
    throw new Error(result.message);
  }
} catch {
  setHasCheered(previousCheered);
  setCheerCount(previousCount);
} finally {
  setIsUpdating(false);
}
}

const handleCopyWish = async () => {
  setCopying(true);

  try {
    const result = await copyWish(wish.id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    setCopied(true);
  } finally {
    setCopying(false);
  }
};

console.log(wish.wish_cheers);

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

      <p>Cheers: {cheerCount}</p>

<p>
  {hasCheered
    ? "You already cheered this."
    : "You haven't cheered yet."}
</p>
<button
  type="button"
  disabled={isUpdating}
  onClick={handleToggleCheer}
>
  🪣 {hasCheered ? "Cheered" : "Cheer"} ({cheerCount})
</button>

<button
  type="button"
  disabled={copying || copied}
  onClick={handleCopyWish}
  className="flex items-center gap-2 rounded-md border px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
>
  {copying
    ? "Adding..."
    : copied
    ? "✔ Added"
    : "➕ Add to My Bucket"}
</button>

    </div>
  );
}