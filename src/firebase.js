import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAVqHIqR-4Qm7J8Y6KD8CNvJq_slmFu2qE",
    authDomain: "international-shopping-list.firebaseapp.com",
    projectId: "international-shopping-list",
    storageBucket: "international-shopping-list.appspot.com",
    messagingSenderId: "889801716137",
    appId: "1:889801716137:web:238be8ded3fe3afcc754b8",
    measurementId: "G-NJRLM8Z025"
});

const db = getFirestore(firebaseApp)

export { firebaseApp, db }
