import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { addListToFS } from '../../utils/services/firebase'
import { useAuth } from '../../utils/hooks/useAuth'
import styles from './styles.newList'

export default function NewList() {
    const userInfo = useAuth();
    const userUID = userInfo.currentUser.uid
    const [isOpen, setIsOpen] = useState(false)
    const [newListTitle, setNewListTitle] = useState("")

    function cancelNewList() {
        console.log("New list is canceld")
        setIsOpen(false)
        setNewListTitle("")
    }

    function makeNewList() {
        addListToFS(userUID, newListTitle)
        setIsOpen(false)
        setNewListTitle("")
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div >
                <button
                    type="button"
                    onClick={openModal}
                    className={styles.button}
                >
                    Add new list
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className={styles.dialog}
                    onClose={cancelNewList}
                >
                    <div className={styles.dialogDiv}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className={styles.dialogOverlay} />
                        </Transition.Child>

                        <span
                            className={styles.dialogSpan}
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className={styles.dialogDivTitle}>
                                <Dialog.Title
                                    as="h3"
                                    className={styles.dialogTitle}
                                >
                                    Titel of your new list:
                                </Dialog.Title>
                                <div className={styles.dialogDivInput}>
                                    <input onInput={e => setNewListTitle(e.target.value)} type="text" />
                                </div>
                                <div className={styles.dialogDivButton}>
                                    <button
                                        type="button"
                                        className={styles.dialogButtonCancel}
                                        onClick={cancelNewList}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.dialogButtonSave}
                                        onClick={makeNewList}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

