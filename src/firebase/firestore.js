import { getFirestore } from "firebase/firestore";
import app from "./firebase.init";

const firestore = getFirestore(app);

export default firestore;
