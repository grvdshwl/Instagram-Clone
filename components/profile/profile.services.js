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

    const followerRef = await firebase
      .firestore()
      .collection("followers")
      .doc(id)
      .collection("userFollowers")
      .doc(firebase.auth().currentUser.uid);

    followerRef.set({});
  } catch (error) {
    console.log(error);
  }
};

export const unfollowRequest = async (id) => {
  try {
    await firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(id)
      .delete();

    await firebase
      .firestore()
      .collection("followers")
      .doc(id)
      .collection("userFollowers")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  } catch (error) {
    console.log(error);
  }
};
