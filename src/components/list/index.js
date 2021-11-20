import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchBar from '../searchBar'
import { ListItem, ListForm } from '../../components'
import { collection, doc, setDoc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebase'

import { useAuth } from '../../utils/hooks/useAuth'



export default function List() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { search } = window.location;
    const querys = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(querys || '');
    const [noListFound, setNoListFound] = useState(false)
    const [shoppingList, setShoppingList] = useState([])
    const languageOrder = ["French", "German", "Dutch"]
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const userUID = auth?.currentUser?.uid


    const getProducts = async () => {
        const newShoppingList = []
        const querySnapshot = await getDocs(collection(db, "lists"));
        querySnapshot.forEach((doc) => {
            doc.data().adminId == userUID && doc.data().listItems.map(item => newShoppingList.push(item))
        });
        setShoppingList(newShoppingList)
        setNoListFound(!newShoppingList.length ? true : false)
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

            try {
                setDoc(docRef, product);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        })
    }

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo]);

    useEffect(() => {
        getProducts()
    }, [userUID])

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
                            {languageOrder.map(language => {
                                return <th>{language}</th>
                            })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdProducts.filter(product => !product.checked && !product.deleted).map(product => {
                            return <ListItem
                                product={product}
                                shoppingList={shoppingList}
                                setShoppingList={setShoppingList}
                                languageOrder={languageOrder}
                            />
                        })}
                    </tbody>
                </table> : null}

            {noListFound && <h2>No List Found</h2>}

            <ListForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
            />

            {filterdProducts.some(product => product.checked && !product.deleted) ?
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th></th>
                            {languageOrder.map(language => {
                                return <th>{language}</th>
                            })}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdProducts.filter(product => product.checked && !product.deleted).map(product => {
                            return <ListItem
                                product={product}
                                shoppingList={shoppingList}
                                setShoppingList={setShoppingList}
                                languageOrder={languageOrder}
                            />
                        })}
                    </tbody>
                </table> : null}
        </div>
    )
}
