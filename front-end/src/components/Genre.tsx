import React from 'react'
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

type reactProps = {
    name: string;
    imgUrl: string;
}

const Genre: React.FC<reactProps> = ({name, imgUrl}) => {
    
  const genreStylesM = css`
    width: 200px;
    
    cursor: pointer;
    text-decoration: none;
    transition: .4s;
  `;

  return (
    <Flex
        flexDirection={"column"}
        css={genreStylesM.styles}
        justifyContent={"space-between"}
        alignContent={"space-between"}
      >
        <Flex>
        <img
          style={{ width: "100%", height: "200px", borderRadius: "10px" }}
          src={
            imgUrl
          }
        />
        </Flex>
        <Box>
          <Flex
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Text fontSize={3} fontWeight="bold">{name}</Text>
          </Flex>
        </Box>
      </Flex>
  )
}

export default Genre