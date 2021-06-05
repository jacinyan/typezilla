import { useDocumentTitle } from "hooks";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import EpicScreen from "../epic";
import KanbanScreen from "../kanban";

const ProjectScreen = () => {
  useDocumentTitle("Project");

  return (
    <div>
      <h1>Project Screen</h1>
      {/* relative paths */}
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        {/* projcects/:projectsId/kanban */}
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        {/* projcects/:projectsId/epic */}
        <Route path={"/epic"} element={<EpicScreen />}></Route>
        <Navigate to={window.location.pathname + "/kanban"}></Navigate>
      </Routes>
    </div>
  );
};

export default ProjectScreen;
