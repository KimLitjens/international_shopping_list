import React, { useEffect, useState } from 'react'

import { Header, List } from '../components'
import {
    getUsersListsFromFS,
} from '../utils/services/firebase'
import { useAuth } from '../utils/hooks/useAuth'

export default function Homepage() {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({})
    const userUID = auth?.currentUser?.uid
    const [lists, setLists] = useState([])

    // get list from FireStore
    const getLists = async () => {
        const usersLists = await getUsersListsFromFS(userUID)
        setLists(usersLists)
    }

    useEffect(() => {
        userUID && getLists()
    }, [userUID])

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo])
    return (
        <div className="min-h-screen bg-gray-200 dark:bg-dark-third">
            <Header />
            {lists.length > 0 ? <List /> : <p className="text-center text-accent">Now List Found </p>}
        </div>
    )
}
