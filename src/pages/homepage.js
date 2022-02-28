import React, { useEffect, useState } from 'react'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'

import { Header, List } from '../components'
import { useAuth } from '../utils/hooks/useAuth'


export default function Homepage() {
    const userInfo = useAuth();
    const [auth, setAuth] = useState({})
    const userUID = auth?.currentUser?.uid
    const [lists, setLists] = useState([])


    // get list from FireStore
    const getLists = async () => {
        const docRef = doc(db, "users", userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const fetchedLists = []
            await docSnap.data().lists.map(list => fetchedLists.push(list));
            setLists(fetchedLists)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
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
            {/* <h2>Your lists:</h2> */}
            {/* {!!lists && lists.map(list => <p key={list}>{list}</p>)} */}
            <List />
        </div>
    )
}
