const styles = {
    tr: ({ checked }) => [
        `w-full ${checked ? "line-through" : null}`
    ],
    td: [
        `px-2`
    ],
    input: [
        `mx-2`
    ],
    p: ({ editing }) => [
        editing ? `hidden` : null
    ],
    quantityEditing: ({ editing }) => [
        `w-16 ${!editing ? 'hidden' : null}`
    ],
    languageEditing: ({ editing }) => [
        `md:flex-row ${!editing ? 'hidden' : null}`
    ],
    button: [
        `mx-2`
    ]
}

export default styles