const styles = {
    div: ({ checked, editing }) => [
        `w-10/12 grid grid-cols-12 gap-4 
        ${checked ? "line-through" : null} 
        ${editing ? `hidden` : null}
        group`
    ],
    language: [
        `col-span-3`
    ],
    input: [
        `mx-2`
    ],
    p: ({ editing }) => [
        `text-center ${editing ? `hidden` : null}`
    ],
    inputDiv: ({ editing }) => [
        `w-10/12 flex flex-col items-center ${!editing ? `hidden` : null} 
        md:${!editing ? `hidden` : null} 
        md:grid grid-cols-12 md:gap-4 my-4`
    ],
    quantityEditing: [
        ` w-16   
        text-yellow-700
            placeholder-gray-700
            bg-transparent border-0 border-b-2 border-gray-800 
            appearance-none 
            focus:outline-none 
            focus:ring-0 
            focus:border-yellow-500 
            md: mr-4
        `
    ],
    quantityLabel: [
        `md:hidden`
    ],
    languageEditing: [
        `col-span-3
        text-yellow-700
        placeholder-gray-700
        bg-transparent border-0 border-b-2 border-gray-800 
        appearance-none 
        focus:outline-none 
        focus:ring-0 
        focus:border-yellow-500 
        md: mr-4
         `
    ],
    languageLabel: [
        `md:hidden
         `
    ],
    button: [
        `mx-2 
        invisible
        group-hover:visible`
    ]
}

export default styles

