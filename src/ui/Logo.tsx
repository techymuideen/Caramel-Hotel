import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/logo-light.png" alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
