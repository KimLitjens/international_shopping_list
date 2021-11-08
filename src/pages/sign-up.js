import React from "react";
import { useForm } from "react-hook-form";

export default function signUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);


    return (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input className="mr-4" {...register("firstName")} placeholder="first name" />
            <input className="mr-4" {...register("lastName")} placeholder="last name" />
            <input className="mr-4" {...register("userName")} placeholder="user name" />
            {errors.exampleRequired && <span>This field is required</span>}

            <input className="bg-yellow-500" type="submit" />
        </form>
    );
}