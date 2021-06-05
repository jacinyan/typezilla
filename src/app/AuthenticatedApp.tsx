import { useAuth } from "hooks";
import ProjectListScreen from "./screens/project-list";
import ProjectScreen from "./screens/project";
import logo from "assets/logo.svg";
import { Button, Dropdown, Menu } from "antd";
import * as S from "./AuthenticatedApp.styles";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

export default function AuthenticatedApp() {
  return (
    <S.Container>
      <AuthenticatedHeader />
      <S.Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </S.Main>
    </S.Container>
  );
}

const AuthenticatedHeader = () => {
  const { logout, user } = useAuth();

  return (
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
  );
};
