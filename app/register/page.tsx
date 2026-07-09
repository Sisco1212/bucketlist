"use client";

import { useActionState } from "react";
import { register } from "@/actions/auth";
import { AuthState } from "@/types/auth";


const Register = () => {

const initialState: AuthState = {
  success: false,
  message: "",
};

const [state, formAction, isPending] = useActionState(
  register,
  initialState
);

//     async function handleSubmit(
//     e: React.SubmitEvent<HTMLFormElement>
// ) {
//     e.preventDefault();

//     const result = await register({
//     username,
//     email,
//     password,
// });

// setMessage(result.message);
// }

  return (
    <>
        <h1 className="text-4xl text-black font-bold text-center mt-8">Register</h1>
<div className="flex w-full h-screen justify-center items-center">
    
    <form action= {formAction}>
        {/* <input 
        type="text" 
        placeholder="Enter your username" 
            onChange={(e) =>
        setUsername(e.target.value)
    }
        /> */}

        <input
    name="username"
    type="text"
/>
{state.errors?.username && (
  <p>{state.errors.username[0]}</p>
)}
        <br />
        {/* <input 
        type="email" 
        placeholder="Enter your email" 
            onChange={(e) =>
        setEmail(e.target.value)
    }
        /> */}

        <input
    name="email"
    type="email"
/>
{state.errors?.email && (
  <p>{state.errors.email[0]}</p>
)}
        <br />
        {/* <input 
        type="password" 
        placeholder="Enter your password" 
            onChange={(e) =>
        setPassword(e.target.value)
    }
        /> */}
        <input
    name="password"
    type="password"
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

export default Register