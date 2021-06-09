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
import { StyledButton } from "./components/misc/GeneralComps";

export default function AuthenticatedApp() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  //refactored with a Button JSX ele itself all the way down for decoupling List and and ProjectPopover from AuthedApp
  //Composition right here at AuthedApp
  return (
    <S.Container>
      <AuthedHeader
        projectButton={
          <StyledButton type={"link"} onClick={() => setProjectModalOpen(true)}>
            Create Project
          </StyledButton>
        }
      />
      <S.Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  projectButton={
                    <StyledButton
                      type={"link"}
                      onClick={() => setProjectModalOpen(true)}
                    >
                      Create Project
                    </StyledButton>
                  }
                />
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

const AuthedHeader = (props: { projectButton: JSX.Element }) => {
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
        <ProjectPopover {...props} />
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
