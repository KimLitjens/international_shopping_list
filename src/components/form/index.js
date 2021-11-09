import React from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
import styles from './form.styles'


export default function Form({ type }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div className={styles.Page}>
            <container className={styles.Container}>
                <div className={styles.InsideContainer}>
                    <h1 className={styles.Title}>
                        {type === "logIn" ? "Log in" : "Sign up"}
                    </h1>
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
                        {errors.password && <span className={styles.Error}>
                            Password is required
                        </span>}
                        <input
                            className={styles.Input}
                            {...register("password", { required: true })}
                            placeholder="password"
                            type="password"
                        />
                        <input
                            className={styles.Submit}
                            type="submit"
                        />
                    </form>
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
            </container>
        </div>
    );
}