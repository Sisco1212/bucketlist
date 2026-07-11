"use server";

import { createSupabaseServerClient } from "@/lib/server";
import { AuthState } from "@/types/auth";
import { registerSchema } from "@/lib/validations/auth";

export async function register(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createSupabaseServerClient();
const data = Object.fromEntries(formData);
const validation = registerSchema.safeParse(data);


if (!validation.success) {
  return {
    success: false,
    message: "Please fix the highlighted fields.",
    errors: validation.error.flatten().fieldErrors,
  };
}

const { username, email, password } = validation.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message:
      "Registration successful! Please check your email to verify your account.",
  };
}