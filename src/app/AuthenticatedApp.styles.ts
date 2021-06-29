import styled from "@emotion/styled";
import FlexRow from "./components/common/FlexRow";

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(FlexRow)`
  padding: 3.2rem;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  z-index: 1;
  background-color: rgb(0, 82, 204);
`;

const HeaderLeft = styled(FlexRow)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export { Container, Header, HeaderLeft, HeaderRight, Main };
