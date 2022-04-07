
import React, { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import {
    ColumnTitles,
    ListItem,
    ListForm,
} from '..'
import styles from './list.styles'

import {
    saveShoppingListInFS,
    getSelectedListFromFS
} from '../../utils/services/firebase'

export default function List({ selectedListUID }) {
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
    const [selectedListInfo, setSelectedListInfo] = useState([])
    const [filterdProducts, setfilterdProducts] = useState([])
    const listTitle = selectedListInfo.listTitle
    const [shoppingList, setShoppingList] = useState([])
    const [shoppingListFetched, setshoppingListFetched] = useState(false)
    const [shownLanguages, setShownLanguages] = useState([])
    const [hiddenLanguages, setHiddenLanguages] = useState([])

    //Get selected listinfo from firestore
    const getSelectedList = async () => {
        const selectedListInfo = await getSelectedListFromFS(selectedListUID)
        setSelectedListInfo(selectedListInfo)
    }

    // set al products from products
    const getProducts = async () => {
        const listItems = await selectedListInfo.listItems
        setShoppingList(listItems)
        setshoppingListFetched(true)
    }

    // set languages
    const setLanguages = () => {
        setShownLanguages(selectedListInfo.shownLanguages)
        setHiddenLanguages(selectedListInfo.hiddenLanguages)
    }
    // filter products
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
        setLanguages()
        getProducts()
    }, [selectedListInfo])

    useEffect(() => {
        filterProducts(shoppingList, searchQuery)
    }, [shoppingList, searchQuery]);

    useEffect(() => {
        shoppingListFetched && saveShoppingListInFS(shoppingList)
    }, [shoppingList])

    useEffect(() => {
        getSelectedList()
    }, selectedListUID)

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
            List products
            {filterdProducts && filterdProducts.filter(product => !product.checked && !product.deleted).map(product => {
                return <ListItem
                    product={product}
                    shoppingList={shoppingList}
                    setShoppingList={setShoppingList}
                    shownLanguages={shownLanguages}
                    key={product.id}
                />
            })}
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

            {filterdProducts && filterdProducts.filter(product => product.checked && !product.deleted).map(product => {
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
