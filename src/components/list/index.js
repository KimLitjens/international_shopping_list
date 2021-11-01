import React, { useState } from 'react'
import { useForm } from "react-hook-form"

export default function Index() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [shoppingList, setShoppingList] = useState([
        {
            french: "la soup",
            german: "die Suppet",
            dutch: "soep",
        },
        {
            french: "le pignon de pin",
            german: "der Pinienkern",
            dutch: "pijnboompitten",
        },
        {
            french: "le cornichon",
            german: "die Essiggurke",
            dutch: "augurk",
        }]
    );


    const onSubmit = product => {
        console.log(product)
        const newListItem = product
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
    }

    return (
        <div className="bg-gray-200 p-4">
            <p>Lists: </p>
            <ul>
                {shoppingList.map(element => {
                    const productNames = Object.values(element)
                    return <div className="flex px-2">
                        <input type="checkbox" />
                        <li className="mx-4">{productNames.join(" / ")}</li>
                        <button>X</button>
                    </div>
                })}
            </ul>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register("french")} placeholder="french" />
                <input  {...register("german")} placeholder="german" />
                <input  {...register("dutch")} placeholder="dutch" />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
}
