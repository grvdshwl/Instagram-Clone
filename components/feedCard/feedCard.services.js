import firebase from "../../firebase/index";

export const saveLike = async ({ userId, id }) => {
  try {
    const snapShot = await firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(id)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid);

    await snapShot.set({});
  } catch (error) {
    console.log(error);
  }
};

export const saveUnlike = async ({ userId, id }) => {
  try {
    const snapShot = await firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(id)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  } catch (error) {
    console.log(error);
  }
};
