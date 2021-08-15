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
  background: linear-gradient(
    90deg,
    rgba(4, 9, 72, 1) 0%,
    rgba(55, 68, 222, 1) 95%
  );
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
`;

const HeaderLeft = styled(FlexRow)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;

export { Container, Header, HeaderLeft, HeaderRight, Main };
