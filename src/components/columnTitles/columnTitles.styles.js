const styles = {
    div: [
        `w-10/12 grid grid-cols-12 gap-4 text-accent`
    ],
    qtyTitle: [
        `text-center underline`
    ],
    languagesDiv: [
        `flex col-span-9 justify-around`
    ],
    languagesTitleDiv: [
        `col-span-3 text-center underline flex group`
    ],
    languageName: [
        `mr-2 my-auto`
    ],
    moveToHiddenButton: [
        `invisible group-hover:visible`
    ],
    addButton: [
        `text-center`
    ],
    hiddenLanguages: ({ showHiddenLanguagesList }) => [
        `${!showHiddenLanguagesList ? "hidden" : null}`
    ],
    addLanguageInput: ({ showHiddenLanguagesList }) => [
        `${!showHiddenLanguagesList ? "hidden" : null}
        w-20
        placeholder-gray-700
        bg-transparent border-0 border-b-2 border-accent
        appearance-none 
        focus:outline-none 
        focus:ring-0 
        focus:border-yellow-500 
        dark:placeholder-dark-secondAccent
        dark:border-dark-accent`
    ]
}

export default styles