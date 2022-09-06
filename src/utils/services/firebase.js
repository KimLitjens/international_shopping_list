import { db } from '../../firebase'
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { uuid } from 'uuidv4'

export async function getListItemsFromFS(userUID) {
    const listItems = []
    const querySnapshot = await getDocs(collection(db, "lists"));

    querySnapshot.forEach((doc) => {
        if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
            console.log(doc.data())
            doc.data().listItems?.map(item => listItems.push(item))
        }
    });
    return listItems
}

export async function getListTitleFromFS(userUID) {
    let listTitle = ''
    const querySnapshot = await getDocs(collection(db, "lists"))

    querySnapshot.forEach((doc) => {
        if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
            listTitle = doc.data().listTitle
        }
    })
    return listTitle
}

export async function getLanguagesFromFS(userUID) {
    const shownLanguages = []
    const hiddenLanguages = []
    const querySnapshot = await getDocs(collection(db, "lists"));

    querySnapshot.forEach((doc) => {
        if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
            doc.data().shownLanguages?.map(item => shownLanguages.push(item))
            doc.data().hiddenLanguages?.map(item => hiddenLanguages.push(item))
        }
    });
    return { shownLanguages: shownLanguages, hiddenLanguages: hiddenLanguages }
}

export async function saveShoppingListInFS(shoppingList, selectedListUID) {
    const docRef = doc(db, "lists", selectedListUID);
    await updateDoc(docRef, {
        listItems: shoppingList
    });
}

export async function getSelectedListFromFS(selectedListUID) {
    const docRef = doc(db, "lists", selectedListUID);
    const docSnap = await getDoc(docRef);
    let selectedListInfo = []

    if (docSnap.exists()) {
        selectedListInfo = docSnap.data();
    } else {
        console.log("No such document!");
    }
    return selectedListInfo
}

export async function getUsersListsUIDFromFS(userUID) {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    let fetchedLists = []

    if (docSnap.exists()) {
        fetchedLists = docSnap.data().lists;
    } else {
        console.log("No such document!");
    }
    return fetchedLists
}

export async function getUsersListsInfoFromFS(lists) {
    const usersListsInfo = []
    const querySnapshot = await getDocs(collection(db, "lists"));
    querySnapshot.forEach((doc) => {
        if (lists.includes(doc.data().docId)) {
            usersListsInfo.push(doc.data())
        }
    })
    return usersListsInfo
}

export async function addListToFS(userUID, listTitel) {
    const dateInMS = Date.now()
    const UUID = uuid()
    const listsUUID = `${dateInMS}-${UUID}`
    const docRefList = doc(db, "lists", listsUUID);
    const docRefUser = doc(db, "users", userUID)

    await setDoc(docRefList, {
        adminId: userUID,
        docId: listsUUID,
        hiddenLanguages: [],
        listItems: [],
        listTitle: listTitel,
        shownLanguages: [],
        users: []
    })

    await updateDoc(docRefUser, {
        lists: arrayUnion(listsUUID)
    })
    console.log("new list is made")
}