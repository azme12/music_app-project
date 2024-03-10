import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

const Categories = [
  "R&B",
  "Electronic",
  "Rock",
  "Rap",
  "country/Ethiopia",
  "Pop",
];

const StyledInput = styled.input`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;
  font-family: cursive;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;
  font-family: cursive;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */

  /* Playful font */
  font-family: "Pacifico", cursive;
  font-size: 18px;

  /* Playful animations on focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
  }
`;
const StyledOption = styled.option`
   
    color: #333;
    padding: 10px 20px;
    border-radius: 5px;

    &:hover {
      background: red;
    }
  }
`;

type reactProps = {
  myRef: any;
  title: string
}

const CustomSelect: React.FC<reactProps> = ({myRef}) => {
  return (
    <>
    <Text fontSize={2} fontWeight="bold" mb={0}>Select Song Genre</Text>
    <StyledSelect ref={myRef}>
      {Categories.map((category, index) => (
        <StyledOption key={index} value={category}>
          {category}
        </StyledOption>
      ))}
    </StyledSelect>
    </>
  );
};

export default CustomSelect;
