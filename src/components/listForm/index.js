import React from 'react'

export default function ListForm({ handleSubmit, onSubmit, register, errors }) {
    return (
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <input className="mr-4" {...register("french")} placeholder="french" />
            <input className="mr-4" {...register("german")} placeholder="german" />
            <input className="mr-4" {...register("dutch")} placeholder="dutch" />
            {errors.exampleRequired && <span>This field is required</span>}

            <input className="bg-yellow-500 px-2 mx-2" type="submit" />
        </form>
    )
}
