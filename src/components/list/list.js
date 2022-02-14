
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchBar from '../searchBar/searchBar'
import { ListItem, ListForm } from '..'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'
import styles from './list.styles'


import { useAuth } from '../../utils/hooks/useAuth'

export default function List() {
    const { register,
        handleSubmit,
        reset,
        setFocus,
        formState: { errors } } = useForm({
            defaultValues: {
                French: '',
                German: '',
                Dutch: ''
            }
        });
    const { search } = window.location;
    const querys = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(querys || '');
    const [noListFound, setNoListFound] = useState(false)
    const [shoppingList, setShoppingList] = useState([])
    const [shoppingListFetched, setshoppingListFetched] = useState(false)
    const languageOrder = ["French", "German", "Dutch"]
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const userUID = auth?.currentUser?.uid

    // Get al products from FireStore
    const getProducts = async () => {
        const newShoppingList = []
        const querySnapshot = await getDocs(collection(db, "lists"));

        querySnapshot.forEach((doc) => {
            if (doc.data().adminId == "backup" || doc.data()?.users?.includes(userUID)) {
                doc.data().listItems?.map(item => newShoppingList.push(item))
            }
        });
        setShoppingList(newShoppingList)
        setNoListFound(!newShoppingList.length ? true : false)
        setshoppingListFetched(true)
    }

    // Filter the list by product name
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
            id: Date.now(),
            quantity: '1',
            status: 'new'
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
        reset()
        setFocus("French")

    }

    // clear input field
    const clearInputField = () => {
        setSearchQuery("")
    }

    // Update shopping list in Firestore after change
    const saveShoppingListInFS = async () => {
        const docRef = doc(db, "lists", "4Ny1Rshg58TG1V6yl6ZM");

        await updateDoc(docRef, {
            listItems: shoppingList
        });
    }

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo]);

    useEffect(() => {
        getProducts()
    }, [userUID])

    useEffect(() => {
        shoppingListFetched && saveShoppingListInFS()
    }, [shoppingList])

    return (
        <div className={styles.div}>
            {/* List Filter */}
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearInputField={clearInputField}
            />
            {/* Title */}
            <h2 className={styles.h2}>Shopping List: </h2>
            {/* Column Titles */}
            <div className="w-10/12 grid grid-cols-12 gap-4">
                <div></div>
                <div className="text-center underline">
                    <h3>Qty</h3>
                </div>
                {languageOrder.map(language => {
                    return <div className="col-span-3 text-center underline"><h3>{language}</h3></div>
                })}
                <div></div>
            </div>

            {filterdProducts.filter(product => !product.checked && !product.deleted).map(product => {
                return <ListItem
                    product={product}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}
                    languageOrder={languageOrder}
                />
            })}
            {/* Message when no list is found */}
            {noListFound && <h2>No List Found</h2>}
            {/* Submit item to List */}
            <ListForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
            />
            {/* Column Titles from checked list */}

            <div className="w-10/12 grid grid-cols-12 gap-4">
                <div></div>
                <div className="text-center underline">
                    <h3>Qty</h3>
                </div>
                {languageOrder.map(language => {
                    return <div className="col-span-3 text-center underline"><h3>{language}</h3></div>
                })}
                <div></div>
            </div>

            {filterdProducts.filter(product => product.checked && !product.deleted).map(product => {
                return <ListItem
                    product={product}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}
                    languageOrder={languageOrder}
                />
            })}
        </div>
    )
}
