import React, { useState } from 'react'

export default function ColumnTitles({
    hiddenLanguages,
    setHiddenLanguages,
    shownLanguages,
    setShownLanguages }) {
    const [showHiddenLanguagesList, setShowHiddenLanguagesList] = useState(false)
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

    return (
        <div className={`w-10/12 grid grid-cols-12 gap-4 text-accent`}>
            <div></div>
            <div className="text-center underline">
                <h3>Qty</h3>
            </div>
            <div className={"flex col-span-9 justify-around"}>
                {shownLanguages.map(language => {
                    return <div key={language} className="col-span-3 text-center underline">
                        <button
                            onClick={() => moveLanguage(language, "moveToHidden")}>
                            <h3>{language}</h3>
                        </button>
                    </div>
                })}
            </div>

            <div>
                <button
                    onClick={showHiddenLanguages}>
                    <h2 className="text-center">+</h2>
                </button>
                {hiddenLanguages.map(language => {
                    return <div key={language} className={`${!showHiddenLanguagesList ? "hidden" : null}`}>
                        <button
                            onClick={() => moveLanguage(language, "moveToShown")}><p>{language}</p></button>
                    </div>
                })}
                <input
                    placeholder="Add New"
                    className={`${!showHiddenLanguagesList ? "hidden" : null}
                        w-20
                        placeholder-gray-700
                        bg-transparent border-0 border-b-2 border-accent
                        appearance-none 
                        focus:outline-none 
                        focus:ring-0 
                        focus:border-yellow-500 
                        dark:placeholder-dark-secondAccent
                        dark:border-dark-accent`} />
            </div>
        </div>
    )
}
