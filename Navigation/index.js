import { NavigationContainer } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { connect } from "react-redux";
import LoadingPage from "../components/common/Loading/Loading.page";
import { checkUserSession } from "../redux/users/users.action";
import { AccountNavigator } from "./account/account.navigation";
import { MainNavigator } from "./main/main.navigation";

const Navigation = ({ checkSession, currentUser }) => {
  useLayoutEffect(() => {
    checkSession();
  }, []);

  return (
    <LoadingPage>
      <NavigationContainer>
        {currentUser ? <MainNavigator /> : <AccountNavigator />}
      </NavigationContainer>
    </LoadingPage>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
