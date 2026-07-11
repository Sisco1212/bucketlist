"use server";

import { createSupabaseServerClient } from "@/lib/server";
import { registerSchema } from "@/lib/validations/auth";
import { AuthState } from "@/types/auth";

export async function login(
    _prevState: AuthState,
    formData: FormData
) {
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

    const { email, password } = validation.data;

    const { error } =
await supabase.auth.signInWithPassword({
    email,
    password,
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
      "Welcome back!",
  };

  console.log(message)
}