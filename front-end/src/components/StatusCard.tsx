import { css } from "@emotion/react";

import React from "react";
import { Flex, Box, Text } from "rebass";

type myComponentProp = {
  title: string;
  data: string;
}

const StatusCard : React.FC<myComponentProp> = ({title, data}) => {

    const cardStyle = css`
    gap: 20px;
    border: 2px solid #a8bcc3;
    padding: 15px;
    color: #1F3044;
    border-radius: 10px;
    height: 200px;
    width: 200px;
  `

    return(
        <>
        {/* card */}
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          css={cardStyle.styles}
        >
          <Box>
            <Text fontSize={3}>{title}</Text>
          </Box>
          <Box>
            <Text fontSize={8} fontWeight="bold">
              {data}
            </Text>
          </Box>
        </Flex>
        </>
    )
}

export default StatusCard