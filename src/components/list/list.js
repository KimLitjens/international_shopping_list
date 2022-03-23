
import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { useAuth } from '../../utils/hooks/useAuth'
import {
    ColumnTitles,
    ListItem,
    ListForm,
} from '..'
import styles from './list.styles'

import {
    getLanguagesFromFS,
    getListItemsFromFS,
    getListTitleFromFS,
    saveShoppingListInFS
} from '../../utils/services/firebase'

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
    const [filterdProducts, setfilterdProducts] = useState([])
    const [listTitle, setListTitle] = useState('')
    const [shoppingList, setShoppingList] = useState([])
    const [shoppingListFetched, setshoppingListFetched] = useState(false)
    const [noListFound, setNoListFound] = useState(false)
    const [shownLanguages, setShownLanguages] = useState([])
    const [hiddenLanguages, setHiddenLanguages] = useState([])

    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const userUID = auth?.currentUser?.uid

    // Get al products from FireStore
    const getProducts = async () => {
        const listItems = await getListItemsFromFS(userUID)
        setShoppingList(listItems)
        setNoListFound(!listItems.length ? true : false)
        setshoppingListFetched(true)
    }

    // Get languages from Firestore
    const getLanguages = async () => {
        const languages = await getLanguagesFromFS(userUID)
        setShownLanguages(languages.shownLanguages)
        setHiddenLanguages(languages.hiddenLanguages)
    }

    // Get list Title from firestore
    const getListTitle = async () => {
        const listTitle = await getListTitleFromFS(userUID)
        setListTitle(listTitle)
    }
    // Filter the list by product name
    const filterProducts = (shoppingList, searchQuery) => {
        const filterdList = () => {
            if (!searchQuery) {
                return shoppingList;
            }
            return shoppingList.filter((product) => {
                const productNames = Object.values(product.productNames);
                return productNames.some(product => product.toLowerCase().includes(searchQuery));
            });
        }
        setfilterdProducts(filterdList)
    };

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

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo]);

    useEffect(() => {
        getLanguages()
        getListTitle()
        getProducts()
    }, [userUID])

    useEffect(() => {
        filterProducts(shoppingList, searchQuery)
    }, [shoppingList, searchQuery]);

    useEffect(() => {
        shoppingListFetched && saveShoppingListInFS(shoppingList)
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

            <ColumnTitles
                shownLanguages={shownLanguages}
                setShownLanguages={setShownLanguages}
                hiddenLanguages={hiddenLanguages}
                setHiddenLanguages={setHiddenLanguages}
            />

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
