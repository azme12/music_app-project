import { Flex, Box, Text } from "rebass";
import Genre from "../components/Genre";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import styled from "@emotion/styled";

type genre = {
  name: string;
  imgUrl: string;
};
const genres: genre[] = [
  {
    name: "country/Ethiopia",
    imgUrl:
      "https://i.ytimg.com/vi/4WqWqazH2po/maxresdefault.jpg",
  },
  {
    name: "Electronic",
    imgUrl:
      "https://th.bing.com/th/id/R.188732cf7c554531bb37c2c2ca1cdfb2?rik=9H6z27KhLWiG0g&pid=ImgRaw&r=0",
  },
  {
    name: "Rap",
    imgUrl:
      "https://th.bing.com/th/id/R.0bc65d3c6c8668c2888e2bd61ba175b7?rik=EPFxkFMwDXnMZQ&pid=ImgRaw&r=0",
  },
  {
    name: "Pop",
    imgUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDPcm3E6e6CamkjWo6rbmlhwNN71GJVecMd9OJ9puXf3TX09jxsh0A1JZHzbejbxxmE40&usqp=CAU",
  },
  {
    name: "Rock",
    imgUrl:
      "https://musicday.org.uk/wp-content/uploads/2022/04/rock-band-300x200.jpg",
  },
  {
    name: "R&B",
    imgUrl:
      "https://th.bing.com/th/id/R.9d4f3f3dd661255637263fa08395e83e?rik=K%2bsD5QwK7f0FaA&pid=ImgRaw&r=0",
  },
  {
    name: "Hip",
    imgUrl:
      "https://th.bing.com/th/id/R.2ac45424e0802727c231d73d16694247?rik=ioK12i3niLDQyw&pid=ImgRaw&r=0",
  },
];

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  width: 100%;
  margin-top: 18px;
  background: repeating-linear-gradient(135deg, #e0e7ef 0 2px, #f8fafc 2px 32px);
  border-radius: 18px;
  padding: 24px 0;
  position: relative;
  transition: background 0.7s;
  &:hover {
    background: repeating-linear-gradient(120deg, #e94f37 0 2px, #f8fafc 2px 32px);
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export default function GenrePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDirection={"column"} alignItems="flex-start" width="100%">
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          Genre
        </Text>
      </Box>
      <GenreGrid>
        {genres.map((data, i) => (
          <Link to={data.name} key={i} style={{ textDecoration: 'none' }}>
            <Genre name={data.name} imgUrl={data.imgUrl} />
          </Link>
        ))}
      </GenreGrid>
    </Flex>
  );
}
