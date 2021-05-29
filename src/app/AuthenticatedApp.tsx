import { useAuth } from "hooks";
import ProjectListScreen from "./screens/project-list";
import * as S from "./AuthenticatedApp.styles";

const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <S.Container>
      <S.Header>
        <S.HeaderLeft>
          <h3>Logo</h3>
          <h3>Projects</h3>
          <h3>User</h3>
        </S.HeaderLeft>
        <S.HeaderRight>
          <button onClick={logout}>Log out</button>
        </S.HeaderRight>
      </S.Header>
      <S.Nav>Navigation</S.Nav>
      <S.Main>
        <ProjectListScreen />
      </S.Main>
      <S.Aside>Aside</S.Aside>
      <S.Footer>Footer</S.Footer>
    </S.Container>
  );
};
export default AuthenticatedApp;
