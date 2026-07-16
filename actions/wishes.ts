"use server";

import { revalidatePath } from "next/cache";
import { createWishSchema } from "@/lib/validations/wish";
import { createSupabaseServerClient } from "@/lib/server";
import type { WishState } from "@/types/wish";
import { updateWishStatusSchema } from "@/lib/validations/wish";
import { WishStatus } from "@/lib/constants/wish-status";
import { deleteWishSchema } from "@/lib/validations/wish";


export async function createWish(
  _prevState: WishState,
  formData: FormData
) {

    const validatedFields = createWishSchema.safeParse({
  title: formData.get("title"),
  description: formData.get("description"),
});

if (!validatedFields.success) {
  return {
    success: false,
    message: "Please fix the errors below.",
    errors: validatedFields.error.flatten().fieldErrors,
  };
}

const supabase = await createSupabaseServerClient();

const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  return {
    success: false,
    message: "You must be logged in.",
  };
}

const { title, description } = validatedFields.data;

const { error } = await supabase
  .from("wishes")
  .insert({
    title,
    description,
    user_id: user.id,
  });

  if (error) {
  return {
    success: false,
    message: "Something went wrong. Please try again.",
  };
}

revalidatePath("/my-bucket");

return {
  success: true,
  message: "Wish added successfully!",
};

}

export async function updateWishStatus(
  userid: string,
  userstatus: WishStatus
){
  const validatedFields = updateWishStatusSchema.safeParse({
    id: userid,
    status: userstatus,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please select a valid status.",
    };
  }

  const { id, status } = validatedFields.data;

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const { error } = await supabase
    .from("wishes")
    .update({
      status,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "Failed to update wish status.",
    };
  }

  revalidatePath("/my-bucket");

  return {
    success: true,
    message: "Status updated successfully!",
  };
}


export async function deleteWish(id: string) {
  const validatedFields = deleteWishSchema.safeParse({
    id,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid wish.",
    };
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const { error } = await supabase
    .from("wishes")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "Failed to delete wish.",
    };
  }

  revalidatePath("/my-bucket");

  return {
    success: true,
    message: "Wish deleted successfully!",
  };
}