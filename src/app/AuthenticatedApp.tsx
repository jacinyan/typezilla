import { useState } from "react";
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
import ProjectModal from "./components/misc/Modal";
import { ProjectPopover } from "./components/misc/Popovers";

export default function AuthenticatedApp() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <S.Container>
      <AuthedHeader setProjectModalOpen={setProjectModalOpen} />
      <S.Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route
              //https://reacttraining.com/blog/react-router-v6-pre/
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </S.Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
        }}
      />
    </S.Container>
  );
}

const AuthedHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
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
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>Users</span>
      </S.HeaderLeft>
      <S.HeaderRight>
        <User />
      </S.HeaderRight>
    </S.Header>
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
