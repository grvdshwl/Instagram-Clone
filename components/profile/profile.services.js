import firebase from "../../firebase/index.js";

export const followRequest = async (id) => {
  try {
    const followRef = await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(id);

    followRef.set({});
  } catch (error) {
    console.log(error);
  }
};

export const unfollowRequest = async (id) => {
  try {
    const unfollowRef = await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(id)
      .delete();
  } catch (error) {
    console.log(error);
  }
};
