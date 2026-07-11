"use client"

import { useActionState } from "react";
import { login } from "@/actions/login";
import { AuthState } from "@/types/auth";


const LoginPage = () => {

    const initialState: AuthState = {
  success: false,
  message: "",
};

    const [state, formAction, isPending] = useActionState(
      login,
      initialState
    );


  return (
    <>
        
    <form action= {formAction}>
        <input
    name="email"
    type="email"
    className="border"
/>
{state.errors?.email && (
  <p>{state.errors.email[0]}</p>
)}
        <br />

        <input
    name="password"
    type="password"
    className="border"
/>
{state.errors?.password && (
  <p>{state.errors.password[0]}</p>
)}
        <br />
<button
    disabled={isPending}
    className="bg-blue-500 text-white py-2 px-4 rounded"
>
    {isPending
        ? "Logging in..."
        : "Login"}
</button>   
<p>{state.message}</p>
    </form>

    </>
  )
}

export default LoginPage