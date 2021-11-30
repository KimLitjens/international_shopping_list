import React from 'react'
import styles from './listForm.styles'

export default function ListForm({ handleSubmit, onSubmit, register, errors }) {
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <input className={styles.input} {...register("French")} placeholder="French" />
            <input className={styles.input} {...register("German")} placeholder="German" />
            <input className={styles.input} {...register("Dutch")} placeholder="Dutch" />
            {errors.exampleRequired && <span>This field is required</span>}

            <input className={styles.submit} type="submit" />
        </form>
    )
}
