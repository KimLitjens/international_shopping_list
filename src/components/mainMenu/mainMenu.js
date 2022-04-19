import React from 'react'

import {
    ChooseList,
    SignOutButton,
    NewList,

} from '../'

export default function MainMenu() {
    return (
        <div>
            <ChooseList />
            <NewList />
            <SignOutButton />
        </div>
    )
}
