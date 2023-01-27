import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useForm } from "react-hook-form";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

import styles from './form.styles'
import { firebaseApp, db } from '../../firebase'
import * as ROUTES from '../../constants/routes'
import { setDoc, doc } from "firebase/firestore"

export default function Form({ type }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const auth = getAuth()

    // What shows up depending on login or signup
    const formDetails = {
        signUp: async (data) => {
            await createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: data.username
                    })
                    setDoc(doc(db, 'users', user.uid), {
                        userId: user.uid,
                        username: data.username.toLowerCase(),
                        firstName: data.firstName.toLowerCase(),
                        lastName: data.lastName.toLowerCase(),
                        emailAddress: data.email.toLowerCase(),
                        dateCreated: Date.now(),
                        lists: []
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        logIn: async (data) => {
            await signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(`${user.displayName} is signed in`)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    };

    const onSubmit = async (e) => {
        try {
            if (firebaseApp) {
                await formDetails[type](e);
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    };

    const toggleIsRevealed = () => {
        setIsPasswordRevealed(!isPasswordRevealed)
    }

    return (
        <div className={styles.Page}>
            <div className={styles.Container}>
                <div className={styles.InsideContainer}>
                    {/* Header */}
                    <h1 className={styles.Title}>
                        {type === "logIn" ? "Log in" : "Sign up"}
                    </h1>
                    {/* Form */}
                    <form
                        className={styles.Form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {errors.firstName && <span className={styles.Error}>
                            First name is required
                        </span>}
                        {type === "signUp" && <input
                            className={styles.Input}
                            {...register("firstName", { required: true })}
                            placeholder="first name"
                        />}
                        {errors.lastName && <span className={styles.Error}>
                            Last name field is required
                        </span>}
                        {type === "signUp" && <input
                            className={styles.Input}
                            {...register("lastName", { required: true })}
                            placeholder="last name"
                        />}
                        {errors.username && <span className={styles.Error}>
                            Username is required
                        </span>}
                        {type === "signUp" && <input
                            className={styles.Input}
                            {...register("username", { required: true })}
                            placeholder="user name"
                        />}
                        {errors.email && <span className={styles.Error}>
                            Please enter a valid email address
                        </span>}
                        <input className={styles.Input} {
                            ...register("email",
                                {
                                    required: true,
                                },
                            )}
                            placeholder="Email"
                            type="email"
                        />
                        <div className="relative ">
                            {errors.password && <span className={styles.Error}>
                                Password is required
                            </span>}
                            <input
                                className={styles.passwordInput}
                                {...register("password", { required: true })}
                                placeholder="password"
                                type={isPasswordRevealed ? "text" : "password"}
                            />
                            <span onClick={() => toggleIsRevealed()}>{isPasswordRevealed ?
                                <EyeIcon className={styles.inputIcon} /> :
                                <EyeOffIcon className={styles.inputIcon} />}
                            </span>
                        </div>
                        {errorMessage && <p>{errorMessage}</p>}
                        <input
                            className={styles.Submit}
                            type="submit"
                        />
                    </form>
                    {/* Link to Log-in or Sign-up */}
                    <div className={styles.Footer}>
                        {type === "logIn" ? "Don't have an account?" : "Already have an account?"}
                        <Link
                            className={styles.Link}
                            to={type === "logIn" ? ROUTES.SIGN_UP : ROUTES.LOG_IN}
                        >
                            {type === "logIn" ? "Sign up here" : "Log in here"}
                        </Link>.
                    </div>
                </div>
            </div>
        </div >

    )
}