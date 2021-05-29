import { useAuth } from "hooks";
import ProjectListScreen from "./screens/project-list";
import * as S from "./AuthenticatedApp.styles";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <S.Container>
      <S.Header spaceBetween>
        <S.HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>Projects</h2>
          <h2>User</h2>
        </S.HeaderLeft>
        <S.HeaderRight>
          <button onClick={logout}>Log out</button>
        </S.HeaderRight>
      </S.Header>
      <S.Main>
        <ProjectListScreen />
      </S.Main>
    </S.Container>
  );
};
export default AuthenticatedApp;
