import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import {
    Header,
    List,
    ListTitles,
} from '../components'
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
    const [cookies, setCookies] = useCookies(['selectedList'])
    const selectedListUID = cookies.selectedList

    // get users lists from FireStore
    const getUsersListsUID = async () => {
        const usersLists = await getUsersListsUIDFromFS(userUID)
        usersLists.length === 1 ? setCookies('selectedList', usersLists[0], { path: '/' })
            : setUsersListsUID(usersLists)
    }

    // get all info from users Lists 
    const getListInfoFromFS = async () => {
        const usersListsInfos = await getUsersListsInfoFromFS(usersListsUID)
        setUsersListsInfos(usersListsInfos)
    }

    const selectList = (list) => {
        setCookies('selectedList', list.docId, { path: '/' })
    }

    useEffect(() => {
        userUID && getUsersListsUID()
    }, [userUID])

    useEffect(() => {
        setAuth(userInfo)
    }, [userInfo])

    useEffect(() => {
        usersListsUID.length > 1 && getListInfoFromFS()
    }, [usersListsUID])

    return (
        <div className="min-h-screen bg-gray-200 dark:bg-dark-third">
            <Header />
            {selectedListUID ? <List selectedListUID={selectedListUID} />
                : usersListsUID.length > 1 ?
                    usersListsInfos.map(list => <ListTitles
                        list={list}
                        selectList={selectList}
                    />)
                    : <p className="text-center text-accent">Now List Found </p>
            }
        </div>
    )
}


