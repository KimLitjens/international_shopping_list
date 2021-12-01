
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SearchBar from '../searchBar/searchBar'
import { ListItem, ListForm } from '..'
import { collection, doc, getDocs, updateDoc, arrayUnion, deleteField } from 'firebase/firestore';
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
    const languageOrder = ["French", "German", "Dutch"]
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const userUID = auth?.currentUser?.uid

    const getProducts = async () => {
        const newShoppingList = []
        const querySnapshot = await getDocs(collection(db, "lists"));

        querySnapshot.forEach((doc) => {
            if (doc.data().adminId == userUID || doc.data()?.users?.includes(userUID)) {
                doc.data().listItems?.map(item => newShoppingList.push(item))
            }
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
            id: Date.now(),
            quantity: '1'
        }
        const newShoppingList = [...shoppingList, newListItem]
        setShoppingList(newShoppingList)
        reset()
        setFocus("French")

    }

    const saveShoppingListInFS = () => {
        shoppingList.forEach(async function (product) {
            const docRef = doc(db, "lists", "4Ny1Rshg58TG1V6yl6ZM");

            await updateDoc(docRef, {
                listItems: deleteField()
            });

            await updateDoc(docRef, {
                listItems: arrayUnion(product)
            });

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
        <div className={styles.div}>
            <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <h2 className={styles.h2}>Shopping List: </h2>
            <div className="w-10/12 grid grid-cols-12 gap-4">
                <div></div>
                <div className="text-center"><h3>Qty</h3></div>
                {languageOrder.map(language => {
                    return <div className="col-span-3 text-center"><h3>{language}</h3></div>
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

            {noListFound && <h2>No List Found</h2>}

            <ListForm
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                errors={errors}
            />

            <div className="w-10/12 grid grid-cols-12 gap-4">
                <div></div>
                <div className="text-center"><h3>Qty</h3></div>
                {languageOrder.map(language => {
                    return <div className="col-span-3 text-center"><h3>{language}</h3></div>
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
