import React, { useState } from 'react'
import styles from './columnTitles.styles'

export default function ColumnTitles({
    hiddenLanguages,
    setHiddenLanguages,
    shownLanguages,
    setShownLanguages }) {
    const [showHiddenLanguagesList, setShowHiddenLanguagesList] = useState(false)
    const [newLanguage, setNewLanguage] = useState()
    const showHiddenLanguages = () => {
        setShowHiddenLanguagesList(!showHiddenLanguagesList)
    }

    const moveLanguage = (movedLanguage, moveTo) => {
        let newHiddenLanguagesList = [...hiddenLanguages]
        let newShownLanguagesList = [...shownLanguages]
        if (moveTo === "moveToHidden") {
            newHiddenLanguagesList.push(movedLanguage)
            newShownLanguagesList = newShownLanguagesList.filter(language => language !== movedLanguage)
        } else {
            newShownLanguagesList.push(movedLanguage)
            newHiddenLanguagesList = newHiddenLanguagesList.filter(language => language !== movedLanguage)
        }

        setHiddenLanguages(newHiddenLanguagesList)
        setShownLanguages(newShownLanguagesList)
        setShowHiddenLanguagesList(false)
    }

    const enterPressed = async (event) => {
        if (event.key == "Enter" && newLanguage) {
            await hiddenLanguages.push(newLanguage)
            setNewLanguage('')
            event.target.value = ""
        }
    }

    const handleOnchange = async (event) => {
        setNewLanguage(event.target.value)
    }

    return (
        <div className={styles.div}>
            <div></div>
            <div className={styles.qtyTitle}>
                <h3>Qty</h3>
            </div>
            <div className={styles.languagesDiv}>
                {shownLanguages && shownLanguages.map(language => {
                    return <div key={language} className={styles.languagesTitleDiv}>
                        <p className={styles.languageName} > {language} </p>
                        <button
                            className={styles.moveToHiddenButton}
                            onClick={() => moveLanguage(language, "moveToHidden")}>
                            <p> x </p>
                        </button>
                    </div>
                })}
            </div>
            <div>
                <button
                    onClick={showHiddenLanguages}>
                    <h2 className={styles.addButton}>+</h2>
                </button>
                {hiddenLanguages && hiddenLanguages.map(language => {
                    return <div key={language} className={styles.hiddenLanguages({ showHiddenLanguagesList })}>
                        <button
                            onClick={() => moveLanguage(language, "moveToShown")}><p>{language}</p></button>
                    </div>
                })}
                {/* TODO add button to add language  */}
                <input
                    placeholder="Add New"
                    className={styles.addLanguageInput({ showHiddenLanguagesList })}
                    type="text"
                    onChange={e => {
                        handleOnchange(e)
                    }}
                    onKeyDown={enterPressed}
                />
            </div>
        </div>
    )
}
