import React, { useEffect, useState } from 'react'

import { Header, List } from '../components'
import {
    getUsersListsUIDFromFS,
    getUsersListsInfoFromFS
} from '../utils/services/firebase'
import { useAuth } from '../utils/hooks/useAuth'

export default function Homepage() {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({})
    const userUID = auth?.currentUser?.uid
    const [usersListsUID, setUsersListsUID] = useState([])
    const [usersListsInfos, setUsersListsInfos] = useState([])
    const [selectedListUID, setSelectedListUID] = useState("")

    // get users lists from FireStore
    const getLists = async () => {
        const usersLists = await getUsersListsUIDFromFS(userUID)
        setUsersListsUID(usersLists)
    }
    // get all info from users Lists 
    const getListInfoFromFS = async () => {
        const usersListsInfos = await getUsersListsInfoFromFS(usersListsUID)
        setUsersListsInfos(usersListsInfos)
    }


    const selectList = (lists) => {
        lists.length === 1 ? setSelectedListUID(lists[0])
            : setSelectedListUID("")
    }


    useEffect(() => {
        userUID && getLists()
    }, [userUID])

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo])

    useEffect(() => {
        selectList(usersListsUID)
        usersListsUID.length > 1 && getListInfoFromFS()
    }, [usersListsUID])

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-dark-third">
            <Header />
            {usersListsUID.length > 1 ? usersListsInfos.map(list => <div>
                <p>
                    {list.listTitle}
                </p>
            </div>)
                : selectedListUID ? <List selectedListUID={selectedListUID} />
                    : <p className="text-center text-accent">Now List Found </p>
            }
        </div>
    )
}