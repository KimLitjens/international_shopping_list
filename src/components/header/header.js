import React, { useState, useEffect } from 'react'
import DarkModeToggle from 'react-dark-mode-toggle'

import styles from './header.styles'
import { SignOutButton } from '..'
import { useAuth } from '../../utils/hooks/useAuth'

export default function Header() {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(() => false);


    useEffect(() => {
        document.body.classList.toggle("dark", isDarkMode)
    }, [isDarkMode])

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo]);

    const welcomeMessage = auth?.currentUser?.displayName
        ? `Welcome ${auth?.currentUser?.displayName}`
        : 'Welcome';
    return (
        <div className={styles.div}>
            <DarkModeToggle
                onChange={setIsDarkMode}
                checked={isDarkMode}
                size={40}
                className={`my-auto ml-2`}
            />
            <h2 className={styles.welcome}>{welcomeMessage}</h2>
            <h1 className={styles.h1}>My International Shopping List</h1>
            <SignOutButton />
        </div>
    )
}
