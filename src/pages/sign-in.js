import React from "react";
import { useForm } from "react-hook-form";
import * as ROUTES from '../constants/routes'
import { Link } from 'react-router-dom';

export default function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Log in</h1>
                    <form className="mt-4 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        {errors.email && <span className="text-red-500 my-1">Please enter a valid email address</span>}
                        <input className="block border border-grey-light w-full p-3 rounded mb-4" {
                            ...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            },
                            )}
                            placeholder="Email"
                        />
                        {errors.password && <span className="text-red-500 my-1">Password is required</span>}
                        <input className="block border border-grey-light w-full p-3 rounded mb-4" {...register("password", { required: true })} placeholder="password" />
                        <input className="w-full text-center py-3 rounded bg-yellow-500 text-white hover:bg-green-dark focus:outline-none my-1" type="submit" />
                    </form>
                </div>
                <div class="text-grey-dark mt-6">
                    Don't have a account?
                    <Link class="no-underline border-b border-blue text-blue-500 ml-1" to={ROUTES.SIGN_UP}>
                        Sign up
                    </Link>.
                </div>
            </div>

        </div>

    );
}