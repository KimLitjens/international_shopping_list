import React, { useState } from 'react'
import { useForm } from "react-hook-form"

export default function Index() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [shoppingList, setShoppingList] = useState([

        {
            productName: {
                french: "la soup",
                german: "die Suppet",
                dutch: "soep",

            },
            checked: false,
            id: 2351235233
        },
        {
            productName: {
                french: "le pignon de pin",
                german: "der Pinienkern",
                dutch: "pijnboompitten",

            },
            checked: false,
            id: 456435734
        },
        {
            productName: {
                french: "le cornichon",
                german: "die Essiggurke",
                dutch: "augurk",

            },
            checked: false,
            id: 235123
        }]
    );


    const onSubmit = product => {
        const newListItem = {
            productName: product,
            checked: false,
            id: Date.now()
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
    }

    return (
        <div className="bg-gray-200 p-4">
            <p>Lists: </p>
            <ul>
                {shoppingList.map(element => {
                    const productNames = Object.values(element.productName)
                    return <div className="flex px-2">
                        <input type="checkbox" />
                        <li className="mx-4">{productNames.join(" / ")}</li>
                        <button>X</button>
                    </div>
                })}
            </ul>

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="mr-4" {...register("french")} placeholder="french" />
                <input className="mr-4" {...register("german")} placeholder="german" />
                <input className="mr-4" {...register("dutch")} placeholder="dutch" />
                {errors.exampleRequired && <span>This field is required</span>}

                <input className="bg-yellow-500" type="submit" />
            </form>
        </div>
    )
}
