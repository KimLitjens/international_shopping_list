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
                <div className={"flex col-span-9 justify-around"}>
                    {shownLanguages.map(choosenLanguage =>
                        <div key={productNames[choosenLanguage]}
                            className={styles.language}
                            onDoubleClick={handleEditing}>
                            <p className={styles.p({ checked, editing })}
                                onDoubleClick={handleEditing}
                            >
                                {productNames[choosenLanguage]}
                            </p>
                        </div>
                    )}
                </div>
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
                <div className={"flex col-span-9 justify-around"}>
                    {shownLanguages.map(choosenLanguage => <div className={styles.divEditing}>
                        <input
                            type="text"
                            value={productNames[choosenLanguage]}
                            className={styles.languageEditing}
                            onChange={e => {
                                handleOnChange(choosenLanguage, e.target.id, e.target.value)
                            }}
                            id={productId}
                            onKeyDown={handleUpdatedDone}
                        />
                    </div>
                    )}
                </div>
                <div></div>
            </div>
        </>
    )
}