import { initializeApp, getApps } from 'firebase/app';
import { getAuth  } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCHqs4xOjDAdDYBO0K3eyncGxJL6J6RUPU",
  authDomain: "todolist-rn-4910c.firebaseapp.com",
  projectId: "todolist-rn-4910c",
  storageBucket: "todolist-rn-4910c.appspot.com",
  messagingSenderId: "437654672963",
  appId: "1:437654672963:web:bf4661819bce9057c626f6"
}

let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()
}

const db = getFirestore(app);

const auth = getAuth(app);

export { auth, db }