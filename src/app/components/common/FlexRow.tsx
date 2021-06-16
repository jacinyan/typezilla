import styled from "@emotion/styled";

const FlexRow = styled.div<{
  gap?: number | boolean;
  spaceBetween?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : undefined};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export default FlexRow;
