import React, { useState } from 'react'

export default function Index() {
    const [value, setValue] = useState("")
    const [shoppingList, setShoppingList] = useState([
        { text: "Gâteaux apéritifs" },
        { text: "Pain de mie" },
        { text: "Fromage râpe" }
    ]);

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log(value)
        if (!value) return
        addShoppingListItem(value)
        console.log("submitted")
        setValue("")
    }

    const addShoppingListItem = text => {
        console.log("item, added", text)
        const newListItem = [...shoppingList, { text }]
        setShoppingList(newListItem)
    }

    return (
        <div className="bg-gray-200 p-4">
            <p>Lists: </p>
            <ul>
                {shoppingList.map(element => {
                    return <div className="flex px-2">
                        <input type="checkbox" />
                        <li className="mx-4">{element.text}</li>
                        <button>X</button>
                    </div>
                })}
            </ul>

            <form onSubmit={(e) => onSubmitHandler(e)}>
                <label htmlFor=""> Enter your shopping item
                    <input
                        type="text"
                        className="border mx-4"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
