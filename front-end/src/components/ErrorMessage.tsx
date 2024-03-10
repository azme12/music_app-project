import React from 'react'
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Text } from "rebass";
import { IoIosClose } from "react-icons/io";

const CloseIcon = styled(IoIosClose)`
  font-size: 40px;
  cursor: pointer;
  transition: all 0.5s ease;
  color: red;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #d0e3f0;
  border-radius: 10px;
  padding: 10px;
  transition: all 0.5s ease;
  margin-bottom: 5px;
`;

type myComponentProp = {
    message: string;
    show: (status: boolean) => void
}

const ErrorMessage: React.FC<myComponentProp> = ({message, show}) => {
  return (
    <ErrorMessageContainer>
          <Box>
            <Text fontSize={2} color={"red"} ml={2}>
              {message}
            </Text>
          </Box>
          <Box>
            <CloseIcon onClick={() => show(false)} />
          </Box>
        </ErrorMessageContainer>
  )
}

export default ErrorMessage