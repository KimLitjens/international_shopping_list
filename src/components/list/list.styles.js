const styles = {
    li: [
        "mx-4",
    ].join(' '),
    p: ({ checked }) =>
        [
            checked ? "line-through" : null
        ]
}

export default styles