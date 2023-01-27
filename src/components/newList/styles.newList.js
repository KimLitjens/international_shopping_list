const styles = {
    button: [
        `
        py-1 px-3 mx-2 mb-2 w-56
        bg-accent text-dark text-xs text-left uppercase font-black
        rounded inline-block 
        cursor-pointer tracking-widest 
        hover:text-white dark:hover:text-dark-first
    `
    ],
    secondButton: [
        `my-auto mr-4 px-8 py-2 
         text-white font-bold text-m 
         cursor-pointer 
         rounded-full bg-gradient-to-r from-blue-800 to-blue-500 border-transparent `
    ],
    div: [
        `flex justify-center mt-20`
    ],
    dialog: [
        `fixed inset-0 z-10 overflow-y-auto`
    ],
    dialogDiv: [
        `min-h-screen px-4 text-center`
    ],
    dialogOverlay: [
        `fixed inset-0`
    ],
    dialogSpan: [
        `inline-block h-screen align-middle`
    ],
    dialogDivTitle: [
        `inline-block w-full max-w-md 
        p-6 my-8 overflow-hidden text-center align-middle 
        transition-all transform bg-accent shadow-xl rounded-2xl`
    ],
    dialogTitle: [
        `text-lg font-medium leading-6 text-first`
    ],
    dialogDivInput: [
        `mt-2`
    ],
    dialogDivButton: [
        `mt-4 flex justify-between`
    ],
    dialogButtonCancel: [
        `inline-flex justify-center px-4 py-2 
        text-sm font-medium text-blue-900 bg-blue-100 
        border border-transparent rounded-md 
        hover:bg-blue-200 focus:outline-none 
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500`
    ],
    dialogButtonSave: [
        `inline-flex justify-center px-4 py-2 
        text-sm font-medium text-blue-900 bg-blue-100 
        border border-transparent rounded-md 
        hover:bg-blue-200 
        focus:outline-none focus-visible:ring-2 
        focus-visible:ring-offset-2 focus-visible:ring-blue-500`
    ]
}

export default styles

