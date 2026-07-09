"use server";

import { createSupabaseServerClient } from "@/lib/server";
import { AuthState } from "@/types/auth";
import { registerSchema } from "@/lib/validations/auth";

export async function register(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createSupabaseServerClient();

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = registerSchema.safeParse({
  username,
  email,
  password,
});


//   if (!username || !email || !password) {
//     return {
//       success: false,
//       message: "All fields are required.",
//     };
//   }

if (!validation.success) {
  return {
    success: false,
    message: "Please fix the highlighted fields.",
    errors: validation.error.flatten().fieldErrors,
  };
}

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