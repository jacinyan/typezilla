import { useAuth } from "hooks";
import ProjectListScreen from "./screens/project_list";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Log out</button>
      <ProjectListScreen />
    </div>
  );
};
export default AuthenticatedApp;
