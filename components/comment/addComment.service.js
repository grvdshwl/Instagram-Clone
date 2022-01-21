import firebase from "../../firebase/index";

export const addComment = async (post, comment) => {
  const { userId, id } = post;

  const randomId = `comment${Math.ceil(Math.random() * 1000000000000)}`;

  try {
    const snapShot = await firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(id)
      .collection("comment")
      .doc(randomId);

    await snapShot.set({
      content: comment,
      commenterId: firebase.auth().currentUser.uid,
      creation: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
};
