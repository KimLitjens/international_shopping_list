import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import styles from './signOut.styles'

export default function SignOutButton() {
    const auth = getAuth();

    const signUserOut = async () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            console.log(error)
        });
    };
    return (
        <div className="grid">
            <button
                onClick={signUserOut}
                type="submit"
                className={styles.button}
            >
                Sign Out
            </button>
        </div>

    );
}
