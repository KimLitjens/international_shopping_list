import React from 'react'

export default function ListForm({ handleSubmit, onSubmit, register, errors }) {
    return (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input className="mr-4" {...register("French")} placeholder="French" />
            <input className="mr-4" {...register("German")} placeholder="German" />
            <input className="mr-4" {...register("Dutch")} placeholder="Dutch" />
            {errors.exampleRequired && <span>This field is required</span>}

            <input className="bg-yellow-500 px-2 mx-2" type="submit" />
        </form>
    )
}
