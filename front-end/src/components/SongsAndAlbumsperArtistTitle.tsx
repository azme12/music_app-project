import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";

const SongsAndAlbumsperArtistTitle = () => {
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
      p={[2]}
    >
      <Box flex={2}>
        <Text fontSize={[2, 3, 4]} fontWeight="bold">
          Artist Name
        </Text>
      </Box>
      <Box flex={1}>
        <Flex justifyContent={"center"}>
          <Box>
            <Text fontSize={[2, 3, 4]} fontWeight="bold">
              Total Albums
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box flex={1}>
        <Flex justifyContent={"end"}>
          <Box>
            <Text fontSize={[2, 3, 4]} fontWeight="bold">
              Total Songs
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SongsAndAlbumsperArtistTitle;
