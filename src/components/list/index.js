import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import styles from './list.styles'
import SearchBar from '../searchBar'

export default function List() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');


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
        },
        {
            productName: {
                french: "la pomme de terre",
                german: "die Kartoffeln",
                dutch: "aardappel",

            },
            checked: true,
            id: 1636038161272
        },
        {
            productName: {
                french: "le haricots verts",
                german: "die grüne Bohne",
                dutch: "sperziebonen",

            },
            checked: false,
            id: 1636038154864
        },]
    );



    const filterProducts = (shoppingList, searchQuery) => {
        if (!searchQuery) {
            return shoppingList;
        }

        return shoppingList.filter((product) => {
            const productNames = Object.values(product.productName);
            return productNames.some(product => product.toLowerCase().includes(searchQuery));
        });
    };

    const filterdProducts = filterProducts(shoppingList, searchQuery);

    const onSubmit = product => {
        const newListItem = {
            productName: product,
            checked: false,
            id: Date.now()
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
    }

    const handleChange = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id == item.target.id ? product.checked = !product.checked : null)
        setShoppingList(productList)
    }

    const handleDelete = async item => {
        const newShoppingList = []
        await shoppingList.map(product => product.id != item.target.id ? newShoppingList.push(product) : null)
        setShoppingList(newShoppingList)
    }

    return (
        <div className="flex flex-col items-center bg-gray-200  p-4">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <p className="my-2">Shopping List: </p>
            {shoppingList.some(element => !element.checked) ?
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th>French</th>
                            <th>German</th>
                            <th>Dutch</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdProducts.filter(element => !element.checked).map(element => {
                            const productName = element.productName
                            const productId = element.id

                            return <tr >
                                <td className="px-2">
                                    <label >
                                        <input
                                            className="mx-2"
                                            type="checkbox"
                                            id={productId}
                                            onChange={handleChange}
                                            checked={false}
                                        />
                                    </label>
                                </td>
                                <td className="px-2">
                                    {productName.french}
                                </td>
                                <td className="px-2">
                                    {productName.german}
                                </td>
                                <td className="px-2">
                                    {productName.dutch}
                                </td>
                                <button
                                    className="mx-2"
                                    id={productId}
                                    onClick={handleDelete}
                                >
                                    X
                                </button>
                            </tr>
                        })}
                    </tbody>
                </table> : null}

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="mr-4" {...register("french")} placeholder="french" />
                <input className="mr-4" {...register("german")} placeholder="german" />
                <input className="mr-4" {...register("dutch")} placeholder="dutch" />
                {errors.exampleRequired && <span>This field is required</span>}

                <input className="bg-yellow-500 px-2 mx-2" type="submit" />
            </form>

            {shoppingList.some(element => element.checked) ?
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th>French</th>
                            <th>German</th>
                            <th>Dutch</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdProducts.filter(element => element.checked).map(element => {
                            const productName = element.productName
                            const productId = element.id
                            const checked = element.checked
                            return <tr >
                                <td className="px-2">
                                    <label >
                                        <input
                                            className="mx-2"
                                            type="checkbox"
                                            id={productId}
                                            onChange={handleChange}
                                            checked
                                        />
                                    </label>
                                </td>
                                <td className="px-2">
                                    <p className={styles.p({ checked })}>
                                        {productName.french}
                                    </p>
                                </td>
                                <td className="px-2">
                                    <p className={styles.p({ checked })}>
                                        {productName.german}
                                    </p>
                                </td>
                                <td className="px-2">
                                    <p className={styles.p({ checked })}>
                                        {productName.dutch}
                                    </p>
                                </td>
                                <button
                                    className="mx-2"
                                    id={productId}
                                    onClick={handleDelete}
                                >
                                    X
                                </button>
                            </tr>
                        })}
                    </tbody>
                </table> : null}
        </div>
    )
}
