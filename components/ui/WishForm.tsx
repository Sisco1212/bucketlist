"use client";

import { useActionState } from "react";

import { createWish } from "@/actions/wishes";
import type { WishState } from "@/types/wish";

const initialState: WishState = {
  success: false,
  message: "",
};

const WishForm = () => {

    const [state, formAction, isPending] = useActionState(
  createWish,
  initialState
);

  return (
    <form action={formAction}>
        <input
  name="title"
  type="text"
  placeholder="Enter your wish"
/>
 <br />
{state.errors?.title && (
  <p>{state.errors.title[0]}</p>
)}

<textarea
  name="description"
  placeholder="Describe your wish (optional)"
/>

{state.errors?.description && (
  <p>{state.errors.description[0]}</p>
)}

<button disabled={isPending}>
  {isPending ? "Adding..." : "Add Wish"}
</button>

<p>{state.message}</p>

    </form>
  )
}

export default WishForm