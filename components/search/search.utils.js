import firebase from "../../firebase/index";
export const fetchUsers = async (searchQuery) => {
  try {
    const snapShot = await firebase
      .firestore()
      .collection("users")
      .where("name", ">=", searchQuery)
      .get();

    let usersData = snapShot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return usersData;
  } catch (error) {
    console.log(error.message);
  }
};
