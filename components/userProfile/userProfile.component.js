import React, { useLayoutEffect, useState } from "react";

import { fetchPostForUser, fetchUserFollowingData } from "../../firebase";
import { Profile } from "../profile/profile.component";

export const UserProfile = (props) => {
  const { userData } = props.route.params;
  const [userPost, setUserPost] = useState([]);

  const fetchUsersPost = async (id) => {
    const postData = await fetchPostForUser(id);
    setUserPost(postData);
  };

  useLayoutEffect(() => {
    fetchUsersPost(userData.id);
  }, []);

  return (
    <>
      <Profile posts={userPost} userData={userData} />
    </>
  );
};
