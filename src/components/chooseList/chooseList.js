import React from 'react'
import { useCookies } from 'react-cookie'

import styles from './chooseList.styles'


export default function ChooseList() {
    const [cookies, setCookies, removeCookie] = useCookies(['selectedList'])

    const removeListCookie = () => {
        removeCookie('selectedList')
    }
    return (
        <button
            className={styles.button}
            onClick={() => removeListCookie()}>
            Choose List
        </button>
    )
}
