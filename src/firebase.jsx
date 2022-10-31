import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
//  firebase config
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth=getAuth(app);

export default app;
