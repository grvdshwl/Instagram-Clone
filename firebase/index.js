import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyACoO_gZNysMIT4hHKWRLJK92KnNf2WAlo",
  authDomain: "instagram-clone-73c78.firebaseapp.com",
  projectId: "instagram-clone-73c78",
  storageBucket: "instagram-clone-73c78.appspot.com",
  messagingSenderId: "1050482276517",
  appId: "1:1050482276517:web:0529355b6dc6b26cf4b54c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firebase.firestore().doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
