import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import ProjectListScreen from "./screens/project-list";
import ProjectScreen from "./screens/project";
import { useAuth } from "hooks/auth";
import { resetRoutes } from "utils";
import logo from "assets/logo.svg";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  Main,
} from "./AuthenticatedApp.styles";
import { ProjectModal } from "./components/common/Modals";
import { ProjectPopover } from "./components/common/Popovers";

export default function AuthenticatedApp() {
  return (
    <Container>
      <Router>
        <AuthedHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              //https://reacttraining.com/blog/react-router-v6-pre/
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
}

const AuthedHeader = () => {
  return (
    <Header spaceBetween>
      <HeaderLeft gap={true}>
        <Button
          type={"link"}
          onClick={resetRoutes}
          style={{ display: "flex", alignItems: "center", padding: 0 }}
        >
          <img src={logo} alt={"logo"} style={{ height: "4.5rem" }} />
        </Button>
        <ProjectPopover />
        <span>Users</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  return (
    user && (
      <>
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
      </>
    )
  );
};
