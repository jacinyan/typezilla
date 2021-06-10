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
  return (
    <S.Container>
      <Router>
        <AuthedHeader />
        <S.Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              //https://reacttraining.com/blog/react-router-v6-pre/
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </S.Main>
        <ProjectModal />
      </Router>
    </S.Container>
  );
}

const AuthedHeader = () => {
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
        <ProjectPopover />
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
