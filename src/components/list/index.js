import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchBar from '../searchBar'
import { ListItem } from '../../components'
import { collection, getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../../firebase'


export default function List() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [shoppingList, setShoppingList] = useState([])

    const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "lists", "4Ny1Rshg58TG1V6yl6ZM", "listItems"));
        const newShoppingList = []
        querySnapshot.forEach((doc) => {
            newShoppingList.push(doc.data())
        });
        setShoppingList(newShoppingList)
    }

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
            productNames: product,
            checked: false,
            id: Date.now()
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
    }

    useEffect(() => {
        getProducts()
    }, [])

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
