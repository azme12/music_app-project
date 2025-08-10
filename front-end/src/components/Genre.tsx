import React from 'react'
import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import { Analytics } from "@vercel/analytics/react"


type reactProps = {
    name: string;
    imgUrl: string;
  }
  
const Genre: React.FC<reactProps> = ({name, imgUrl}) => {
  
  const genreStylesM = css`
  width: 180px;
  height: 240px;
  cursor: pointer;
  text-decoration: none;
  transition: box-shadow 0.3s, transform 0.2s, background 0.5s;
  box-shadow: 0 2px 10px #0001;
  border-radius: 16px;
  background: linear-gradient(135deg, #18181b 60%, #23272f 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  border: 2px solid #23272f;
  &:hover {
    box-shadow: 0 8px 32px #e94f3733, 0 0 0 4px #e94f37;
    transform: translateY(-8px) scale(1.06) rotate(-2deg);
    background: linear-gradient(120deg, #23272f 0%, #e94f37 100%);
    border-color: #e94f37;
    animation: genrePulse 1.2s infinite alternate;
  }
  @keyframes genrePulse {
    0% {
      filter: brightness(1) drop-shadow(0 0 0 #e94f37);
    }
    100% {
      filter: brightness(1.15) drop-shadow(0 0 16px #e94f37);
    }
  }
    `;

  return (
    <>
    <Flex
        flexDirection={"column"}
        css={genreStylesM.styles}
        justifyContent={"space-between"}
        alignContent={"space-between"}
      >
        <Flex>
        <img
          style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "12px 12px 0 0" }}
          src={imgUrl}
        />
        </Flex>
        <Box width="100%" mt={2}>
          <Flex
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Text fontSize={3} fontWeight="bold" color="#e94f37" style={{textAlign:'center', letterSpacing: '2px', textShadow: '0 2px 8px #0008'}}>
              {name.split('/').map((part, idx) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < name.split('/').length - 1 && <br />}
                </React.Fragment>
              ))}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Analytics />
      </>
  )
}

export default Genre