import { Menu } from "antd";
import { UnorderedListOutlined, HddOutlined } from "@ant-design/icons";
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
        <Menu
          mode={"inline"}
          selectedKeys={[useRouteType()]}
          style={{ backgroundColor: "#fafafa" }}
        >
          <Menu.Item key={"kanban"} icon={<HddOutlined />}>
            <Link to={"kanban"}>Kanban</Link>
          </Menu.Item>
          <Menu.Item key={"epics"} icon={<UnorderedListOutlined />}>
            <Link to={"epics"}>Epics</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        {/* https://reacttraining.com/blog/react-router-v6-pre/ */}
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
