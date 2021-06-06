import { Link, Route, Routes, Navigate } from "react-router-dom";
import EpicScreen from "../epic";
import KanbanScreen from "../kanban";
import { useDocumentTitle } from "hooks";

const ProjectScreen = () => {
  useDocumentTitle("Project");

  return (
    <div>
      <h1>Project Screen</h1>
      {/* https://reacttraining.com/blog/react-router-v6-pre/ */}
      <Link to={"kanban"}>Kanban</Link>
      <Link to={"epic"}>Epic</Link>
      <Routes>
        {/* projcects/:projectsId/kanban */}
        <Route path={"kanban"} element={<KanbanScreen />} />
        {/* projcects/:projectsId/epic */}
        <Route path={"epic"} element={<EpicScreen />} />
        <Navigate to={window.location.pathname + "/kanban"}></Navigate>
      </Routes>
    </div>
  );
};

export default ProjectScreen;
