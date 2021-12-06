import React, { useState } from 'react'
import styles from './listItem.styles'

export default function ListItem({
    languageOrder,
    product,
    shoppingList,
    setShoppingList }) {

    const [editing, setEditing] = useState(false)
    const productNames = product.productNames
    const productId = product.id
    const checked = product.checked


    const handleDelete = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id == item.target.id ? product.deleted = true : null)
        setShoppingList(productList)
    }

    const handleUpdatedDone = event => {
        if (event.key === "Enter") {
            setEditing(false)
        }
    }

    const handleEditing = () => {
        setEditing(true)
    }

    const handleOnChange = (language, id, value,) => {
        const newShoppingList = [...shoppingList]
        newShoppingList.find(item => item.id == id).productNames[language] = value
        setShoppingList(newShoppingList)
    }

    const handleQuantityOnChange = (id, value,) => {
        const newShoppingList = [...shoppingList]
        newShoppingList.find(item => item.id == id).quantity = value
        setShoppingList(newShoppingList)
    }

    const handleChange = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id == item.target.id ? product.checked = !product.checked : null)
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
                {languageOrder.map(choosenLanguage =>
                    Object.entries(productNames).map(([language, productName]) => {
                        return choosenLanguage == language ?
                            <div className={styles.language}>
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
            <div className={styles.inputDiv({ checked, editing })}>
                <div></div>
                <label for={productId} className={styles.quantityLabel}><h3>Quantity: </h3></label>
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

                {languageOrder.map(choosenLanguage =>
                    Object.entries(productNames).map(([language, productName]) => {
                        return choosenLanguage == language ? <>
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
