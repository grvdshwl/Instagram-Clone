import firebase from "../../firebase/index";

export const saveProfilePic = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    let childPath = `post/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString()}`;

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      // console.log(+snapshot.bytesTransferred / +blob.size);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    const taskError = (error) => console.log(error);

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  } catch (error) {
    console.log(error.message);
  }
};

const savePostData = async (downloadURL) => {
  const userRef = await firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid);

  const snapShot = await userRef.get();

  await userRef.set({ ...snapShot.data(), profile_pic: downloadURL });
};
