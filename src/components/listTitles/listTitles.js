import React from 'react'
import styles from './listTitles.styles'

export default function ListTitles({ list, selectList }) {
    return (
        <div className={styles.div}>
            <button
                className={styles.button}
                onClick={() => selectList(list)}
            >
                <p>
                    {list.listTitle}
                </p>
            </button>

        </div>
    )
}
