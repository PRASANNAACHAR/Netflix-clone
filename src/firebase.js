import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDFn7KpeJb0ebihUNvkHkIDFmq3LwFM5LQ",
  authDomain: "netflix-clone-5c2a0.firebaseapp.com",
  projectId: "netflix-clone-5c2a0",
  storageBucket: "netflix-clone-5c2a0.appspot.com",
  messagingSenderId: "21232958335",
  appId: "1:21232958335:web:8245e54a5ff7c45654784a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const  user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        });
    } catch (error) {
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
     try {
         await signInWithEmailAndPassword(auth, email, password);
     } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
     }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login ,signUp, logout};