import styled from "@emotion/styled";

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

export const TasksWrapper = styled.div`
  overflow-x: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
