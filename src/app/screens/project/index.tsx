import { Menu } from "antd";
import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import EpicScreen from "../epic";
import KanbanScreen from "../kanban";
import { useDocumentTitle } from "hooks/_helpers";
import { Aside, Container, Main } from "./index.styles";

const ProjectScreen = () => {
  useDocumentTitle("Project");

  //'active' when selected
  const useRouteType = () => {
    const units = useLocation().pathname.split("/");
    return units[units.length - 1];
  };

  return (
    <Container>
      <Aside>
        {/* https://reacttraining.com/blog/react-router-v6-pre/ */}
        <Menu mode={"inline"} selectedKeys={[useRouteType()]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>Kanban</Link>
          </Menu.Item>
          <Menu.Item key={"epics"}>
            <Link to={"epics"}>Epics</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/* projcects/:projectsId/kanban */}
          <Route path={"kanban"} element={<KanbanScreen />} />
          {/* projcects/:projectsId/epic */}
          <Route path={"epics"} element={<EpicScreen />} />
          {/* remove unmatched routes from the history stack to get out of the infinite loop by replacing them so that home page is reachable*/}
          <Navigate to={window.location.pathname + "/kanban"} replace />
        </Routes>
      </Main>
    </Container>
  );
};

export default ProjectScreen;
