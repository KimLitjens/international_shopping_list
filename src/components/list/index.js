import React from 'react'

export default function Index() {

    const onSubmitHandler = (e) => {
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <div className="bg-gray-200 py-4">
            <p>Lists</p>
            <form onSubmit={(e) => onSubmitHandler(e)}>
                <label htmlFor=""> Enter your shopping item
                    <input type="text" className="border mx-4" />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
