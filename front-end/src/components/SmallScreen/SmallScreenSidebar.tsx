import { BiCategory } from "react-icons/bi";
import { IoIosClose, IoMdHome } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
// Styled component should be defined outside of the component function
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
//
//import { Outlet } from "react-router-dom";

const StyledIcon = styled(IoMdHome)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon2 = styled(BiCategory)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon3 = styled(IoStatsChart)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon4 = styled(IoIosAddCircleOutline)`
  margin-right: 10px;
  font-size: 30px;
`;

const CloseIcon = styled(IoIosClose)`
  cursor: pointer;
  font-size: 50px;
`;
type myComponentProp = {
    openMobileNav: boolean,
    onClick: () => void;
}

const SmallScreenSidebar: React.FC<myComponentProp> = ({openMobileNav, onClick}) => {
 
  const location = useLocation()
    const sideBarStyle = css`
    position: fixed;
    top: 0;      
    left: ${openMobileNav ? "0px" : "-350px"};
    z-index: 30;
   width: 350px;
   height: 100vh;

  
  //  background: #a8bcc3;
  background: #a8bcc3;
  transition: all .5s ease;
  font-weight: bolder;
  `
  const sideBarElement = css`
  font-size: 20px;
  color: #1F3044;
  padding: 7px;
  margin: 5px 16px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: #BD1E51;
  }
  transition: .4s;
  `

  const header = css`
  font-size: 22px;
  color: #E1E2E2;
  text-align: center;
  
  `
  const menu = css`
  margin-top: 25px;
  padding: 0px 10px;
  `
    return<>
        <Flex flexDirection={"column"}  css={sideBarStyle.styles}>
        <Flex flexDirection={"row"} justifyContent="space-between" alignItems="center" css={menu.styles}>
          <Box><Text css={header.styles}>My APP</Text></Box>
          <Box><CloseIcon onClick={onClick}/></Box>
        </Flex>
        <Link to={'/'}>
        <Flex flexDirection={"row"} alignItems="center" onClick={onClick} css={sideBarElement.styles} style={{ color: location.pathname === '/' ? '#BD1E51' : '' }}>
          
            <Box><StyledIcon /></Box>
            <Box>
              <Text>Home</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/genre'}>
        <Flex flexDirection={"row"} alignItems="center" onClick={onClick} css={sideBarElement.styles} style={{ color: location.pathname === '/genre' ? '#BD1E51' : '' }}>
            <Box><StyledIcon2 /></Box>
            <Box>
              <Text>Genre</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/addSong'}>
        <Flex flexDirection={"row"} alignItems="center" onClick={onClick} css={sideBarElement.styles} style={{ color: location.pathname === '/addSong' ? '#BD1E51' : '' }}>
            <Box><StyledIcon4 /></Box>
            <Box>
              <Text>Add Songs</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/Statistics'}>
          <Flex flexDirection={"row"} alignItems="center" css={sideBarElement.styles} onClick={onClick} style={{ color: location.pathname === '/Statistics' ? '#BD1E51' : '' }}>
            <Box><StyledIcon3 /></Box>
            <Box>
              <Text>Statistics</Text>
            </Box>
          </Flex>
          </Link>
        
      </Flex>
    </>
}

export default SmallScreenSidebar