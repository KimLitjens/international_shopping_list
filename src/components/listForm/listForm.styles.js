const styles = {
    form: [
        `flex flex-col md:flex-row my-8`,
    ],
    input: [
        `
            my-2 pt-3 pb-2 px-0 mt-0 
            placeholder-gray-700
            bg-transparent border-0 border-b-2 border-gray-800 
            appearance-none 
            focus:outline-none 
            focus:ring-0 
            focus:border-yellow-500 
            md: mr-4
            `
    ],
    submit: [
        `
            py-1 px-3 
            bg-yellow-500 text-dark text-xs uppercase font-black
            rounded inline-block 
            cursor-pointer tracking-widest 
            transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110
        `
    ]
}

export default styles