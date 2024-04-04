import { BiCategory } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
// Styled component should be defined outside of the component function
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Flex, Box, Text} from "rebass";

import { Link, useLocation } from "react-router-dom";
import React from "react";
//
//import { Outlet } from "react-router-dom";

const StyledIcon = styled(IoHome )`
  margin-right: 20px;
  font-size: 50px;
`;
const StyledIcon2 = styled(BiCategory)`
  margin-right: 20px;
  font-size: 50px;
`;
const StyledIcon3 = styled(MdBarChart)`
  margin-right: 20px;
  font-size: 50px;
`;
const StyledIcon4 = styled(IoIosAddCircle)`
  margin-right: 20px;
  font-size: 50px;
`;
export default function SideBar() {
  const location = useLocation()
    const sideBarStyle = css`
    height: 100vh;
    position: sticky;
    top: 0;
    
   width: 350px;

  
  //  background: #a8bcc3;
  background: #a8bcc3;
  transition: all .5s ease;
  font-weight: bolder;

  @media (max-width: 768px) {
    display: none;
  }
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
        <Flex flexDirection={"column"}  css={sideBarStyle}>
        <Flex flexDirection={"row"} justifyContent="space-between" alignItems="center" css={menu}>
          <Box><Text css={header}>My APP</Text></Box>
          
        </Flex>
        <Link to={'/'}>
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement} style={{ color: location.pathname === '/' ? '#BD1E51' : '' }}>
          
            <Box><StyledIcon /></Box>
            <Box>
              <Text>Home</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/genre'}>
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement} style={{ color: location.pathname === '/genre' ? '#BD1E51' : '' }}>
            <Box><StyledIcon2 /></Box>
            <Box>
              <Text>Genre</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/addSong'}>
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement} style={{ color: location.pathname === '/addSong' ? '#BD1E51' : '' }}>
            <Box><StyledIcon4 /></Box>
            <Box>
              <Text>Add Songs</Text>
            </Box>
          </Flex>
          </Link>
          <Link to={'/Statistics'}>
          <Flex flexDirection={"row"} alignItems="center" css={sideBarElement} style={{ color: location.pathname === '/Statistics' ? '#BD1E51' : '' }}>
            <Box><StyledIcon3 /></Box>
            <Box>
              <Text>Statistics</Text>
            </Box>
          </Flex>
          </Link>
        
      </Flex>
    </>
}