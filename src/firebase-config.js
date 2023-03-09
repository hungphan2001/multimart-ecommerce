import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbJYwMU4VXC9OROpxLLKR7pNqDvBNL6oQ",
  authDomain: "multimart-63369.firebaseapp.com",
  projectId: "multimart-63369",
  storageBucket: "multimart-63369.appspot.com",
  messagingSenderId: "857679269659",
  appId: "1:857679269659:web:3636bd9fd9d577a5bc8dbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;