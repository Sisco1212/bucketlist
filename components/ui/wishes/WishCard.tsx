"use client";
import { useState } from "react";
import type { Wish } from "@/types/wish";
import { WISH_STATUSES } from "@/lib/constants/wish-status";
import type { WishStatus } from "@/lib/constants/wish-status";
import { updateWishStatus, deleteWish, updateWish  } from "@/actions/wishes";

type WishCardProps = {
  wish: Wish;
};

const WishCard = ({ wish }: WishCardProps) => {

const [status, setStatus] = useState(wish.status);
const [ui, setUi] = useState({
  editing: false,
  updating: false,
  deleting: false,
});
const [title, setTitle] = useState(wish.title);

const [description, setDescription] = useState(
  wish.description ?? ""
);

    return (
    <div className="border rounded-lg p-4 space-y-3">

      {!ui.editing ? (
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
) : (
  <div className="space-y-2">
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    value={description}
    onChange={(e) =>
      setDescription(e.target.value)
    }
  />

  <div className="flex gap-2">
    <button
  type="button"
  disabled={ui.updating || ui.deleting}
  onClick={async () => {
    setUi((prev) => ({
      ...prev,
      updating: true,
    }));

    try {
      const result = await updateWish({
        id: wish.id,
        title,
        description,
      });

      if (result.success) {
        setUi((prev) => ({
          ...prev,
          editing: false,
        }));
      }
    } finally {
      setUi((prev) => ({
        ...prev,
        updating: false,
      }));
    }
  }}
>
  {ui.updating ? "Saving..." : "Save"}
</button>

    <button
      type="button"
      onClick={() => {
        setTitle(wish.title);
        setDescription(
          wish.description ?? ""
        );

        setUi((prev) => ({
          ...prev,
          editing: false,
        }));
      }}
    >
      Cancel
    </button>
  </div>
</div>
)}

<select
  name="status"
  value={status}
  disabled={ui.updating || ui.deleting}
  onChange={async (e) => {
    const newStatus = e.target.value as WishStatus;
    const previousStatus = status;

    setStatus(newStatus);

    setUi((prev) => ({
      ...prev,
      updating: true,
    }));

    try {
      await updateWishStatus(wish.id, newStatus);
    } catch {
  setStatus(previousStatus);
} finally {
      setUi((prev) => ({
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
        <button
  disabled={ui.updating || ui.deleting}
  onClick={() =>
    setUi((prev) => ({
      ...prev,
      editing: true,
    }))
  }
>
  Edit
</button>

        <button
  disabled={ui.updating || ui.deleting}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
  onClick={async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this wish?"
  );

  if (!confirmed) return;

  setUi((prev) => ({
    ...prev,
    deleting: true,
  }));

  try {
    await deleteWish(wish.id);
  } finally {
    setUi((prev) => ({
      ...prev,
      deleting: false,
    }));
  }
}}
>
  {ui.deleting ? "Deleting..." : "Delete"}
</button>
      </div>
    </div>
  );
};

export default WishCard;