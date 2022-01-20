import firebase from "../../firebase/index";
export const fetchUsers = async (searchQuery) => {
  try {
    const snapShot = await firebase
      .firestore()
      .collection("users")
      .where("email", "!=", firebase.auth().currentUser.email)
      .get();

    let usersData = snapShot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return usersData.filter((data) => data.name.match(new RegExp(searchQuery)));
  } catch (error) {
    console.log(error.message);
  }
};
