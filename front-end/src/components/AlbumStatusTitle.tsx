import { css } from "@emotion/react";
import React from "react";
import { Flex, Box, Text } from "rebass";

function AlbumStatusTitle() {
  const titleStyle = css`
    width: 100%;
    
    border-radius: 10px;
    background: #a8bcc3;
    color: #1f3044;
  `;
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      css={titleStyle.styles}
      p={2}
    >
      <Box>
        <Text fontSize={[2, 3, 4]} fontWeight="bold">
          Album Name
        </Text>
      </Box>
      <Box>
        <Text fontSize={[2, 3, 4]} fontWeight="bold">
          Total Songs
        </Text>
      </Box>
    </Flex>
  );
};

export default AlbumStatusTitle;
