import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    ChevronDownIcon,
} from '@heroicons/react/solid'

import {
    ChooseList,
    NewList,
    SignOutButton,
} from '../'
import styles from './dropDownMenu.styles'

export default function dropDownMenu() {

    return (
        <div className={styles.div}>
            <Menu as="div" className={styles.menu}>
                <div>
                    <Menu.Button
                        className={styles.menuButton}>
                        Options
                        <ChevronDownIcon
                            className={styles.ChevronDownIcon}
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className={styles.menuItems}>
                        <div className={styles.menuItemsDiv}>
                            <Menu.Item>
                                <ChooseList />
                            </Menu.Item>
                            <Menu.Item>
                                <NewList />
                            </Menu.Item>
                            <Menu.Item>
                                <SignOutButton />
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}