import styled from "@emotion/styled";
import { StyledRow } from "./components/misc/StyledRow";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(StyledRow)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(StyledRow)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

export { Container, Header, HeaderLeft, HeaderRight, Main };
