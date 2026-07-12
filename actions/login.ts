"use server";

import { createSupabaseServerClient } from "@/lib/server";
import { loginSchema } from "@/lib/validations/auth";
import { AuthState } from "@/types/auth";
import { redirect } from "next/navigation";


export async function login(
    _prevState: AuthState,
    formData: FormData
) {
    const supabase = await createSupabaseServerClient();
    const data = Object.fromEntries(formData);
    const validation = loginSchema.safeParse(data);
    
    console.log(validation)
    console.log(data)
    
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
      message: "Invalid email or password.",
    };
  }

  redirect("/my-bucket");

}