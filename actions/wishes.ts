"use server";

import { revalidatePath } from "next/cache";
import { createWishSchema, updateWishSchema, deleteWishSchema, updateWishStatusSchema, shareWishSchema} from "@/lib/validations/wish";
import { createSupabaseServerClient } from "@/lib/server";
import type { WishState } from "@/types/wish";
import { WishStatus } from "@/lib/constants/wish-status";


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

export async function updateWish(data: {
  id: string;
  title: string;
  description: string;
}) {
  const validatedFields = updateWishSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Please fix the errors.",
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

  const { id, title, description } = validatedFields.data;

  const { error } = await supabase
    .from("wishes")
    .update({
      title,
      description,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: "Failed to update wish.",
    };
  }

  revalidatePath("/my-bucket");

  return {
    success: true,
    message: "Wish updated successfully!",
  };
}

export async function shareWish(
  wishId: string,
  isPublic: boolean
) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "Unauthorized.",
    };
  }

  const validated = shareWishSchema.safeParse({
  id: wishId,
  isPublic,
});

if (!validated.success) {
  return {
    success: false,
    message: "Invalid data.",
  };
}

  const { error } = await supabase
    .from("wishes")
    .update({
      is_public: isPublic,
    })
    .eq("id", wishId)
    .eq("user_id", user.id);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/my-bucket");
  revalidatePath("/feed");

  return {
    success: true,
    message: isPublic
      ? "Wish shared successfully."
      : "Wish removed from feed.",
  };
}