const styles = {
    tr: ({ checked }) => [
        checked ? "line-through" : null
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
    inputEditing: ({ editing }) => [
        !editing ? `hidden` : null
    ],
    button: [
        `mx-2`
    ]
}

export default styles