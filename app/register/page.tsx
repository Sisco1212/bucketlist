"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";
import { AuthState } from "@/types/auth";


const RegisterPage = () => {

const initialState: AuthState = {
  success: false,
  message: "",
};

const [state, formAction, isPending] = useActionState(
  register,
  initialState
);

  return (
    <>
        <h1 className="text-4xl text-black font-bold text-center mt-8">Register</h1>
<div className="flex w-full h-screen justify-center items-center">
    
    <form action= {formAction}>

        <input
    name="username"
    type="text"
    className="border"
/>
{state.errors?.username && (
  <p>{state.errors.username[0]}</p>
)}
        <br />


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
        ? "Creating account..."
        : "Register"}
</button>   
<p>{state.message}</p>
    </form>
    
</div>
    </>
  )
}

export default RegisterPage