import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const LanesContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  //relative to Container
  flex: 1;
`;
