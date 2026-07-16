"use client";
import { useState } from "react";
import type { Wish } from "@/types/wish";
import { WISH_STATUSES } from "@/lib/constants/wish-status";
import type { WishStatus } from "@/lib/constants/wish-status";
import { updateWishStatus, deleteWish } from "@/actions/wishes";

type WishCardProps = {
  wish: Wish;
};

const WishCard = ({ wish }: WishCardProps) => {

const [status, setStatus] = useState(wish.status);
const [loading, setLoading] = useState({
  updating: false,
  deleting: false,
});
    return (
    <div className="border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="text-xl font-semibold">
          {wish.title}
        </h3>

        {wish.description && (
          <p className="text-gray-600">
            {wish.description}
          </p>
        )}
      </div>

<select
  name="status"
  value={status}
  disabled={loading.updating || loading.deleting}
  onChange={async (e) => {
    const newStatus = e.target.value as WishStatus;
    const previousStatus = status;

    setStatus(newStatus);

    setLoading((prev) => ({
      ...prev,
      updating: true,
    }));

    try {
      await updateWishStatus(wish.id, newStatus);
    } catch {
  setStatus(previousStatus);
} finally {
      setLoading((prev) => ({
        ...prev,
        updating: false,
      }));
    }
  }}
>
  {WISH_STATUSES.map((status) => (
    <option
      key={status.value}
      value={status.value}
    >
      {status.emoji} {status.label}
    </option>
  ))}
</select>

      <div className="flex gap-2">
        <button>Edit</button>

        <button
  disabled={loading.updating || loading.deleting}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
  onClick={async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this wish?"
  );

  if (!confirmed) return;

  setLoading((prev) => ({
    ...prev,
    deleting: true,
  }));

  try {
    await deleteWish(wish.id);
  } finally {
    setLoading((prev) => ({
      ...prev,
      deleting: false,
    }));
  }
}}
>
  {loading.deleting ? "Deleting..." : "Delete"}
</button>
      </div>
    </div>
  );
};

export default WishCard;