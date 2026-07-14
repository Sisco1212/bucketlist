"use client";
import { useState } from "react";
import type { Wish } from "@/types/wish";
import { WISH_STATUSES } from "@/lib/constants/wish-status";
import type { WishStatus } from "@/lib/constants/wish-status";
import { useActionState, useRef } from "react";
import { updateWishStatus } from "@/actions/wishes";
import type { WishState } from "@/types/wish";


const initialState: WishState = {
  success: false,
  message: "",
};

type WishCardProps = {
  wish: Wish;
};

const WishCard = ({ wish }: WishCardProps) => {
  
    const [status, setStatus] = useState(() => {
  console.log("INITIAL STATUS:", wish.status);
  return wish.status;
});

console.log("PROP STATUS:", wish.status);
console.log("LOCAL STATUS:", status);


// const [status, setStatus] = useState(wish.status);

const [state, formAction, isPending] = useActionState(
  updateWishStatus,
  initialState
);

const formRef = useRef<HTMLFormElement>(null);

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

      <form
  ref={formRef}
  action={formAction}
>
<input
  type="hidden"
  name="id"
  value={wish.id}
/>

<select
  name="status"
  value={status}
  disabled={isPending}
  onChange={(e) => {
    setStatus(e.target.value as WishStatus);
    formRef.current?.requestSubmit();
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
      </form>

      <div className="flex gap-2">
        <button>Edit</button>

        <button>Delete</button>
      </div>
    </div>
  );
};

export default WishCard;