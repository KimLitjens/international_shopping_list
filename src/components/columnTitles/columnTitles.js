import React, { useState } from 'react'

export default function ColumnTitles({ shownLanguages, hiddenLanguages }) {
    const [showHiddenLanguagesList, setShowHiddenLanguagesList] = useState(false)
    const showHiddenLanguages = () => {
        setShowHiddenLanguagesList(!showHiddenLanguagesList)
    }

    return (
        <div className={`w-10/12 grid grid-cols-12 gap-4 text-accent`}>
            <div></div>
            <div className="text-center underline">
                <h3>Qty</h3>
            </div>
            {shownLanguages.map(language => {
                return <div key={language} className="col-span-3 text-center underline">
                    <h3>{language}</h3>
                </div>
            })}
            <div>
                <button
                    onClick={showHiddenLanguages}>
                    <h2 className="text-center">+</h2>
                </button>
                {hiddenLanguages.map(language => {
                    return <div key={language} className={`${!showHiddenLanguagesList ? "hidden" : null}`}>
                        <p>{language}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
