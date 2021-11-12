import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import SearchBar from '../searchBar'
import { ListItem } from '../../components'

export default function List() {
    const { register, handleSubmit, formState: { errors } } = useForm();
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

    return (
        <div className="flex flex-col items-center bg-gray-200  p-4">
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <p className="my-2">Shopping List: </p>
            {filterdProducts.some(element => !element.checked) ?
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th>French</th>
                            <th>German</th>
                            <th>Dutch</th>
                            <th></th>
                        </tr>
                    </thead>
                    {filterdProducts.filter(product => !product.checked).map(product => {
                        return <ListItem
                            product={product}
                            shoppingList={shoppingList}
                            setShoppingList={setShoppingList}
                        />
                    })}
                </table> : null}

            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                <input className="mr-4" {...register("french")} placeholder="french" />
                <input className="mr-4" {...register("german")} placeholder="german" />
                <input className="mr-4" {...register("dutch")} placeholder="dutch" />
                {errors.exampleRequired && <span>This field is required</span>}

                <input className="bg-yellow-500 px-2 mx-2" type="submit" />
            </form>

            {filterdProducts.some(element => element.checked) ?
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th>French</th>
                            <th>German</th>
                            <th>Dutch</th>
                            <th></th>
                        </tr>
                    </thead>
                    {filterdProducts.filter(product => product.checked).map(product => {
                        return <ListItem
                            product={product}
                            shoppingList={shoppingList}
                            setShoppingList={setShoppingList}
                        />
                    })}
                </table> : null}
        </div>
    )
}
