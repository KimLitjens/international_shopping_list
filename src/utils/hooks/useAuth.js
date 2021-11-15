import React, {
    useState, useEffect, useContext, createContext,
} from 'react';
import { firebaseApp } from '../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authContext = createContext();
const auth = getAuth(firebaseApp);

/* A hook to rerender child component if auth status changes */
export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authUser => {
            if (authUser) {
                setCurrentUser(authUser)
            } else {
                setCurrentUser({})
            }
        })

        return () => unsubscribe()
    }, [])

    return {
        currentUser,
    }
};

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
};


