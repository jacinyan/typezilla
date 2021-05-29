import styled from "@emotion/styled";
import { StyledRow } from "./components/common/Row";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(StyledRow)``;

const HeaderLeft = styled(StyledRow)``;

const HeaderRight = styled.div``;

const Main = styled.main``;

export { Container, Header, HeaderLeft, HeaderRight, Main };
