import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity } from "react-native";
import { Avatar, Searchbar } from "react-native-paper";
import styled from "styled-components";
import { fetchUsers } from "./search.utils";

const SearchContainer = styled.View``;
const SearchInput = styled(Searchbar)`
  margin: 10px;
`;
const SearchedUser = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled(Avatar.Image).attrs({
  size: 80,
})`
  margin: 10px;
`;

export const SearchScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const handleSearch = async (searchQuery) => {
    const userData = await fetchUsers(searchQuery);
    setUsers(userData);
  };

  return (
    <SearchContainer>
      <SearchInput onChangeText={(text) => handleSearch(text)} />
      {!!users.length && (
        <ScrollView>
          {users.map((item) => {
            const {
              name,
              id,
              profile_pic = "https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg",
            } = item;
            return (
              <SearchedUser
                key={id}
                onPress={() => {
                  navigation.navigate("UserProfile", { userData: item });
                }}
              >
                <UserAvatar source={{ uri: `${profile_pic}` }} />
                <Text>{name}</Text>
              </SearchedUser>
            );
          })}
        </ScrollView>
      )}
    </SearchContainer>
  );
};
