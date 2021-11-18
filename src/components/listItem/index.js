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


    const handleDelete = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id == item.target.id ? product.deleted = !product.deleted : null)
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

    const handleChange = async item => {
        const productList = [...shoppingList]
        await productList.map(product => product.id == item.target.id ? product.checked = !product.checked : null)
        setShoppingList(productList)
    }

    return (
        <tr className={product.checked ? "line-through" : null} key="something" >
            <td className="px-2">
                <label >
                    <input
                        className="mx-2"
                        type="checkbox"
                        id={productId}
                        onChange={handleChange}
                        checked={product.checked ? true : false}
                    />
                </label>
            </td>

            {languageOrder.map(choosenLanguage => Object.entries(productNames).map(([language, productName]) => {
                return choosenLanguage == language ? <td className="px-2">
                    <p className={styles.p({ editing })}
                        onDoubleClick={handleEditing}
                    >
                        {productName}
                    </p>
                    <input
                        type="text"
                        className={!editing ? "hidden" : null}
                        value={productName}
                        onChange={e => {
                            handleOnChange(language, e.target.id, e.target.value)
                        }}
                        id={productId}
                        onKeyDown={handleUpdatedDone}
                    />
                </td>
                    : null
            }))}
            <button
                className="mx-2"
                id={productId}
                onClick={handleDelete}
            >
                X
            </button>
        </tr>
    )
}