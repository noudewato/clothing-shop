import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDoc, setDoc, doc, getFirestore, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCZuNdEiAiRhywnj3t3nOnSlmLdtG7FYM",
  authDomain: "clothing-shop-1007.firebaseapp.com",
  projectId: "clothing-shop-1007",
  storageBucket: "clothing-shop-1007.appspot.com",
  messagingSenderId: "1064660312048",
  appId: "1:1064660312048:web:37e208f546573e4f1d4735",
  measurementId: "G-FZK3178G7Q",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapShot = await getDocs(q)
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})

  return categoryMap
}
export const createUserAuthDocument = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);
    
    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);
    console.log(userSnapShot.exists());


    //create new user if user doesn't exist
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.error("something went wrong please try again", error.message)
        }
    }

    return userDocRef
   
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth)

export const onAuthChangedStateListener = (callBack) => {
  return onAuthStateChanged(auth, callBack)
}

