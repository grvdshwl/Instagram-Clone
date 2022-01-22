import React, { useLayoutEffect, useState } from "react";

import { fetchPostForUser, fetchUserFollowingData } from "../../firebase";
import {
  LoadingComponent,
  LoadingContainer,
} from "../common/Loading/Loading.component";
import { Profile } from "../profile/profile.component";

export const UserProfile = (props) => {
  const { userData } = props.route.params;
  const [userPost, setUserPost] = useState(null);

  const fetchUsersPost = async (id) => {
    const postData = await fetchPostForUser(id);
    setUserPost(postData);
  };

  useLayoutEffect(() => {
    fetchUsersPost(userData.id);
  }, []);

  if (!userPost) {
    return (
      <LoadingContainer>
        <LoadingComponent />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Profile posts={userPost} userData={userData} />
    </>
  );
};
