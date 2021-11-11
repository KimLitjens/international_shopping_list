import React from 'react'

export default function ListItem({ language, productName }) {
    return (
        <td className="px-2">
            <p >
                {productName}
            </p>
        </td>
    )
}
