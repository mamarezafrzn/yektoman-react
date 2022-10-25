import React from "react";
import styled from "styled-components";
import { HamburgerMenu } from "../hamburgerMenu";

const NavbarContainer = styled.div`
  width: 100%;
  height: 55px;
  border-bottom: 1px solid #fff;
  display: flex;
  flex-direction:row;
  align-items: center;
  padding: 0 1.5em;
  @media (min-width: 950px) {
    display: none;
  }
`;

const Navbar = (props) => {
  return (
    <NavbarContainer>
      <HamburgerMenu />
    </NavbarContainer>
  );
}

export default Navbar