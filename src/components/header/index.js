import React, { useState, useEffect } from 'react'
import styles from './header.styles'
import { SignOutButton } from '../../components'
import { useAuth } from '../../utils/hooks/useAuth'

export default function Header() {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo]);

    const welcomeMessage = auth?.currentUser?.displayName
        ? `Welcome ${auth?.currentUser?.displayName}`
        : 'Welcome';
    return (
        <div className={styles.div}>
            <h2 className={styles.welcome}>{welcomeMessage}</h2>
            <h1 className={styles.h1}>My International Shopping List</h1>
            <SignOutButton />
        </div>
    )
}
