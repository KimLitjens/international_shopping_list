import { db } from '../../firebase'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

export async function getListItemsFromFS(userUID) {
    const listItems = []
    const querySnapshot = await getDocs(collection(db, "lists"));

    querySnapshot.forEach((doc) => {
        if (doc.data().adminId === userUID || doc.data()?.users?.includes(userUID)) {
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

export async function saveShoppingListInFS(shoppingList) {
    const docRef = doc(db, "lists", "4Ny1Rshg58TG1V6yl6ZM");
    await updateDoc(docRef, {
        listItems: shoppingList
    });
}

export async function getUsersListsFromFS(userUID) {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    const fetchedLists = []

    if (docSnap.exists()) {
        await docSnap.data().lists.map(list => fetchedLists.push(list));
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    return fetchedLists
}