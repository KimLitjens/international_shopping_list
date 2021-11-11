const styles = {
    li: [
        `mx-4 py-4 bg-green-500`,
    ].join(' '),
    p: ({ editing }) => [
        editing ? `hidden` : null
    ]
}

export default styles