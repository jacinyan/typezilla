import { Navigate, Route, Routes } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import ProjectListScreen from "./screens/project-list";
import ProjectScreen from "./screens/project";
import { useAuth } from "hooks/auth";
import { resetRoutes } from "utils";
import logoHeader from "assets/logo-header.svg";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  Main,
} from "./AuthenticatedApp.styles";
import ProjectModal from "./components/common/ProjectModal";
import ProjectPopover from "./components/common/ProjectPopover";
import UserPopover from "./components/common/UserPopover";

export default function AuthenticatedApp() {
  return (
    <Container>
      <AuthedHeader />
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route
            //https://reacttraining.com/blog/react-router-v6-pre/
            path={"/projects/:projectId/*"}
            element={<ProjectScreen />}
          />
          <Route path="*" element={<Navigate to={"/projects"} replace />} />
        </Routes>
      </Main>
      <ProjectModal />
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
          <img src={logoHeader} alt={"logo"} style={{ height: "4.5rem" }} />
        </Button>
        <ProjectPopover />
        <UserPopover />
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
        <span style={{ color: "#fff" }}>Hi,</span>
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
            style={{ padding: "0.5rem", color: "#fff" }}
          >
            {user.name}
          </Button>
        </Dropdown>
      </>
    )
  );
};
