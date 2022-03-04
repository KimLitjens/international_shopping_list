import React, { useState } from 'react'
import styles from './listItem.styles'

export default function ListItem({
    shownLanguages,
    product,
    shoppingList,
    setShoppingList }) {

    const [editingList, setEditingList] = useState([])
    const [editing, setEditing] = useState(false)
    const productNames = product.productNames
    const productId = product.id
    const checked = product.checked

    // Clicking the delete button
    const handleDelete = product => {
        const newShoppingList = [...shoppingList]
        const shoppingListItem = newShoppingList.find(item => item.id === +product.target.id)
        shoppingListItem.deleted = true
        setShoppingList(newShoppingList)
    }

    const handleUpdatedDone = async (event) => {
        if (event.key === "Enter" && editingList.length > 0) {
            await setShoppingList(editingList)
            setEditingList([])
            setEditing(false)
        } else if (event.key === "Enter") {
            setEditingList([])
            setEditing(false)
        }
    }

    const handleEditing = () => {
        setEditing(true)
    }
    // changing item
    const handleOnChange = (language, id, value,) => {
        const newShoppingList = [...shoppingList]
        const shoppingListItem = newShoppingList.find(item => item.id === +id)
        shoppingListItem.productNames[language] = value
        console.log(newShoppingList)
        setEditingList(newShoppingList)
    }
    // changing quantity from item
    const handleQuantityOnChange = (id, value,) => {
        const newShoppingList = [...shoppingList]
        const shoppingListItem = newShoppingList.find(item => item.id === +id)
        shoppingListItem.quantity = value
        setEditingList(newShoppingList)
    }

    const handleChange = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id === +item.target.id ? product.checked = !product.checked : null)
        setShoppingList(productList)
    }

    console.log(editingList.length)

    return (
        <>
            <div className={styles.div({ editing })} >
                <label >
                    <input
                        className={styles.input}
                        type="checkbox"
                        id={productId}
                        onChange={handleChange}
                        checked={product.checked ? true : false}
                    />
                </label>
                <p className={styles.p({ editing })}
                    onDoubleClick={handleEditing}>
                    {product.quantity}
                </p>
                {shownLanguages.map(choosenLanguage =>
                    Object.entries(productNames).map(([language, productName]) => {
                        return choosenLanguage === language ?
                            <div key={productName} className={styles.language}>
                                <p className={styles.p({ checked, editing })}
                                    onDoubleClick={handleEditing}
                                >
                                    {productName}
                                </p>
                            </div>
                            : null
                    }))}
                <button
                    className={styles.button}
                    id={productId}
                    onClick={handleDelete}
                >
                    X
                </button>
            </div>
            {/* Editing mode  */}
            <div className={styles.inputDiv({ checked, editing })}>
                <div></div>
                {/* <label className={styles.quantityLabel}><h3>Quantity: </h3></label> */}
                <input
                    type="text"
                    className={styles.quantityEditing}
                    value={product.quantity}
                    onChange={e => {
                        handleQuantityOnChange(e.target.id, e.target.value)
                    }}
                    id={productId}
                    onKeyDown={handleUpdatedDone}
                />

                {shownLanguages.map(choosenLanguage =>
                    Object.entries(productNames).map(([language, productName]) => {
                        return choosenLanguage === language ? <>
                            <label className={styles.languageLabel}>
                                <h3>{language}: </h3>
                            </label>
                            <input
                                type="text"
                                value={productName}
                                className={styles.languageEditing}
                                onChange={e => {
                                    handleOnChange(language, e.target.id, e.target.value)
                                }}
                                id={productId}
                                onKeyDown={handleUpdatedDone}
                            />
                        </>
                            : null
                    }))}
                <div></div>
            </div>
        </>
    )
}
