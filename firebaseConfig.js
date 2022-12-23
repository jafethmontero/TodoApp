import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwSYyLt2_brOl6C8thxkkpsi3eQ3wpKsA",
  authDomain: "todoapp-ios-902d1.firebaseapp.com",
  projectId: "todoapp-ios-902d1",
  storageBucket: "todoapp-ios-902d1.appspot.com",
  messagingSenderId: "334138645318",
  appId: "1:334138645318:web:5a14c0acbbcdc13865e347",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
