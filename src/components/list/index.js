import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchBar from '../searchBar'
import { ListItem, ListForm } from '../../components'
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
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
            const productNames = Object.values(product.productNames);
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

    const saveShoppingListInFS = () => {
        shoppingList.forEach(async function (product) {
            const id = '' + product.id
            const docRef = doc(db, "lists", "4Ny1Rshg58TG1V6yl6ZM", "listItems", id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                try {
                    setDoc(docRef, product);
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        saveShoppingListInFS()
    }, [shoppingList])

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
                    <tbody>
                        {filterdProducts.filter(product => !product.checked && !product.deleted).map(product => {
                            return <ListItem
                                product={product}
                                shoppingList={shoppingList}
                                setShoppingList={setShoppingList}
                            />
                        })}
                    </tbody>
                </table> : null}

            <ListForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
            />

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
                    <tbody>
                        {filterdProducts.filter(product => product.checked && !product.deleted).map(product => {
                            return <ListItem
                                product={product}
                                shoppingList={shoppingList}
                                setShoppingList={setShoppingList}
                            />
                        })}
                    </tbody>
                </table> : null}
        </div>
    )
}
