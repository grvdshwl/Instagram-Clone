import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDjPngU5STkLzy0xNbJWPnFoU04PjDvYBU",
  authDomain: "instagram-clone-270d9.firebaseapp.com",
  projectId: "instagram-clone-270d9",
  storageBucket: "instagram-clone-270d9.appspot.com",
  messagingSenderId: "269620129760",
  appId: "1:269620129760:web:886c0e4d7f423162e50585",
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

export const getUserById = async (id) => {
  try {
    const userRef = firebase.firestore().doc(`users/${id}`);
    const snapShot = await userRef.get();
    return snapShot.data();
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchPostForUser = async (uid) => {
  if (!uid) {
    return;
  }

  const snapShot = await firebase
    .firestore()
    .collection("posts")
    .doc(`${uid}`)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get();

  let posts = snapShot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });

  return posts.sort(function (a, b) {
    return b.creation - a.creation;
  });
};

export const fetchUserFollowingData = async (id) => {
  if (!id) {
    return;
  }

  const snapShot = await firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .get();

  const followingData = snapShot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return { id, ...data };
  });

  const isFollowing = followingData.some((data) => data.id === id);
  return isFollowing;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const fetchUserFeedData = async (followingData) => {
  try {
    const mainData = followingData.map(async (userId) => {
      const userRef = firebase.firestore().doc(`users/${userId.id}`);
      const snapShot = await userRef.get();
      const userPostData = await fetchPostForUser(userId.id);

      const userData = { ...snapShot.data(), id: snapShot.id };

      const data = userPostData.map((data) => ({
        ...data,
        userId: userData.id,
        name: userData.name,
        email: userData.email,
        profile_pic: userData.profile_pic,
      }));
      return data;
    });

    const finalData = await Promise.all(mainData);

    const data = finalData.flat().sort(function (a, b) {
      return b.creation - a.creation;
    });

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default firebase;
