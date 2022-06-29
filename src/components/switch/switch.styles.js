const styles = {
    switch: [
        `bg-dark-first dark:bg-first
                 relative inline-flex items-center h-6 rounded-full w-11
                my-auto ml-2`
    ],
    span: ({ isDarkMode }) => [
        `${isDarkMode ? 'translate-x-6' : 'translate-x-1'
        } inline-block w-4 h-4 transform bg-accent rounded-full`
    ]
}

export default styles