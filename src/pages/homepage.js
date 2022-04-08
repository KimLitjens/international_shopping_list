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
    const getUsersListsUID = async () => {
        const usersLists = await getUsersListsUIDFromFS(userUID)
        setUsersListsUID(usersLists)
        usersLists.length === 1 ? setSelectedListUID(usersLists[0])
            : setSelectedListUID("")
    }
    // get all info from users Lists 
    const getListInfoFromFS = async () => {
        const usersListsInfos = await getUsersListsInfoFromFS(usersListsUID)
        setUsersListsInfos(usersListsInfos)
    }

    const selectList = (list) => {
        setSelectedListUID(list.docId)
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
                : usersListsUID.length > 1 ? usersListsInfos.map(list => <div>
                    <button
                        className=" py-1 px-3 ml-2 my-2
                                        bg-accent text-dark text-xs uppercase font-black
                                         rounded inline-block 
                                        cursor-pointer tracking-widest 
                                        transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        onClick={() => selectList(list)}
                    >
                        <p className="">
                            {list.listTitle}
                        </p>
                    </button>

                </div>)
                    : <p className="text-center text-accent">Now List Found </p>
            }
        </div>
    )
}

