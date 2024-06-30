import styled, { css } from "styled-components";

const Row: React.FC<{
  children: React.ReactNode;
  direction?: string | "vertical";
}> = styled.div`
  display: flex;

  ${(props) =>
    props.direction === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.direction === "vertical" &&
    css`
      flex-direction: column;
      align-items: baseline;
      gap: 1.6rem;
    `}
`;

export default Row;
