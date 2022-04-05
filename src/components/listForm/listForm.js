import React from 'react'
import styles from './listForm.styles'

export default function ListForm({
    handleSubmit,
    onSubmit,
    register,
    errors,
    setSearchQuery,
    shownLanguages
}) {
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            onInput={e => setSearchQuery(e.target.value.toLowerCase())}
        >
            {shownLanguages && shownLanguages.map(language => {
                return <input
                    key={language}
                    className={styles.input}
                    {...register(language)}
                    placeholder={language} />
            }
            )}
            {errors.exampleRequired && <span>This field is required</span>}

            <input className={styles.submit} type="submit" />
        </form>
    )
}
