import React from 'react'
import styles from './header.styles'
import { SignOutButton } from '../../components'

export default function Header() {
    return (
        <div className={styles.div}>
            <div></div>
            <h1 className={styles.h1}>My International Shopping List</h1>
            <SignOutButton />
        </div>
    )
}
