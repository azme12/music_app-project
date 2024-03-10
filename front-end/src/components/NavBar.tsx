import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TbMusicSearch } from "react-icons/tb";
import { useLocation } from "react-router";
import SmallScreenSidebar from "./SmallScreen/SmallScreenSidebar";
import { useState } from "react";

const MenuIcon = styled(BsFillMenuButtonWideFill)`
  cursor: pointer;
  font-size: 50px;
`;
const SearchIcon = styled(TbMusicSearch)`
cursor: pointer;
  font-size: 25px;
  position: absolute;
  margin-left: 5px;
`

const SearchContainer = styled.div`
position: relative;
display: flex;
align-items: center;

`

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const location = useLocation()
  const NavStyle = css`
    // background: #1F3044;
    background: #a8bcc3;
    margin: 10px 0px;
    padding: 10px 20px;
    border-radius: 10px;
    position: sticky;
    top: 0;
    height: 70px;
    z-index: 20;
    gap: 20px;
    
  `;
  const SearchStyleInput = styled.input`
    padding: 10px 32px;
    
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */
  width: 300px;
  
  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
    
  `;

  return (
    <>
      {/* Nav bar */}
      <SmallScreenSidebar openMobileNav={open} onClick={() => setOpen(false)}/>
      <Flex css={NavStyle.styles} justifyContent={"space-between"} alignItems={"center"}>
        <Box>
            <SearchContainer style={{display: location.pathname === '/' ? 'flex' : 'none'}}>
                <SearchIcon />
          <SearchStyleInput type="text" placeholder="Search your favorites music ..." />
          </SearchContainer>
        </Box>
        <Box>
          <MenuIcon onClick={() => setOpen(true)}/>
        </Box>
      </Flex>
    </>
  );
}
