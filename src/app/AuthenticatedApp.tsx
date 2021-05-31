import { useAuth } from "hooks";
import ProjectListScreen from "./screens/project-list";
import { Button, Dropdown, Menu } from "antd";
import * as S from "./AuthenticatedApp.styles";
import logo from "assets/logo.svg";

const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <S.Container>
      <S.Header spaceBetween>
        <S.HeaderLeft gap={true}>
          <img src={logo} alt={"logo"} style={{ maxHeight: "4.6rem" }} />
          <h2>Projects</h2>
          <h2>User</h2>
        </S.HeaderLeft>
        {user && (
          <S.HeaderRight>
            <span>Hi,</span>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key={"logout"}>
                    <Button type={"link"} onClick={logout}>
                      Log Out
                    </Button>
                  </Menu.Item>
                </Menu>
              }
            >
              <Button
                type={"link"}
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{ padding: "0.5rem" }}
              >
                {user.name}
              </Button>
            </Dropdown>
          </S.HeaderRight>
        )}
      </S.Header>
      <S.Main>
        <ProjectListScreen />
      </S.Main>
    </S.Container>
  );
};
export default AuthenticatedApp;
