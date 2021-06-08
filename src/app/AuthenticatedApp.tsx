import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import ProjectListScreen from "./screens/project-list";
import ProjectScreen from "./screens/project";
import { useAuth } from "hooks/auth";
import { resetRoutes } from "utils";
import logo from "assets/logo.svg";
import * as S from "./AuthenticatedApp.styles";

export default function AuthenticatedApp() {
  return (
    <S.Container>
      <AuthenticatedHeader />
      <S.Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              //https://reacttraining.com/blog/react-router-v6-pre/
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
        <Button
          type={"link"}
          onClick={resetRoutes}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src={logo} alt={"logo"} style={{ height: "4.5rem" }} />
        </Button>
        <h4>Projects</h4>
        <h4>Users</h4>
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
