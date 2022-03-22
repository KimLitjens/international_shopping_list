
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    ColumnTitles,
    ListItem,
    ListForm,
} from '..'
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
    const [listTitle, setListTitle] = useState('')
    const [shoppingList, setShoppingList] = useState([])
    const [shoppingListFetched, setshoppingListFetched] = useState(false)
    const [shownLanguages, setShownLanguages] = useState([])
    const [hiddenLanguages, setHiddenLanguages] = useState([])
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const userUID = auth?.currentUser?.uid

    // Get al products from FireStore
    const getProducts = async () => {
        const newShoppingList = []
        const querySnapshot = await getDocs(collection(db, "lists"));

        querySnapshot.forEach((doc) => {
            if (doc.data().adminId === "backup" || doc.data()?.users?.includes(userUID)) {
                doc.data().listItems?.map(item => newShoppingList.push(item))
                setListTitle(doc.data().listTitle)
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

    // Get languages from Firestore
    const getLanguagesFromFS = async () => {
        const shownLanguages = []
        const hiddenLanguages = []
        const querySnapshot = await getDocs(collection(db, "lists"));

        querySnapshot.forEach((doc) => {
            if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
                doc.data().shownLanguages?.map(item => shownLanguages.push(item))
            }
        });
        querySnapshot.forEach((doc) => {
            if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
                doc.data().hiddenLanguages?.map(item => hiddenLanguages.push(item))
            }
        });
        setShownLanguages(shownLanguages)
        setHiddenLanguages(hiddenLanguages)
    }

    const filterdProducts = filterProducts(shoppingList, searchQuery);

    const onSubmit = product => {
        const newListItem = {
            productNames: product,
            checked: false,
            id: Date.now(),
            quantity: '1',
            status: 'new',
            deleted: false
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
        reset()
        setFocus(shownLanguages[0])
        setSearchQuery('')
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
        getLanguagesFromFS()
    }, [userUID])

    useEffect(() => {
        shoppingListFetched && saveShoppingListInFS()
    }, [shoppingList])

    return (
        <div className={styles.div}>
            {/* Title */}
            <h2 className={styles.h2}>{listTitle}: </h2>
            {/* Column Titles */}
            <ColumnTitles
                shownLanguages={shownLanguages}
                setShownLanguages={setShownLanguages}
                hiddenLanguages={hiddenLanguages}
                setHiddenLanguages={setHiddenLanguages}
            />
            {/* List products  */}
            {filterdProducts.filter(product => !product.checked && !product.deleted).map(product => {
                return <ListItem
                    product={product}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}
                    shownLanguages={shownLanguages}
                    key={product.id}
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
                setSearchQuery={setSearchQuery}
                shownLanguages={shownLanguages}
            />
            {/* Column Titles from checked list */}

            <div className={styles.listTitles}>
                <div></div>
                <div className="text-center underline">
                    <h3>Qty</h3>
                </div>
                {shownLanguages.map(language => {
                    return <div
                        key={language}
                        className="col-span-3 text-center underline">
                        <h3>{language}</h3>
                    </div>
                })}
                <div></div>
            </div>

            {filterdProducts.filter(product => product.checked && !product.deleted).map(product => {
                return <ListItem
                    product={product}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}
                    shownLanguages={shownLanguages}
                    key={product.id}
                />
            })}
        </div>
    )
}
