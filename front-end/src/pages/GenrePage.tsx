import { css } from "@emotion/react";
import { Flex, Box, Text } from "rebass";
import Genre from "../components/Genre";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

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
      "https://th.bing.com/th/id/R.031ca0831248088b4711e87f8839d39c?rik=xwyFAx3Rl79cxA&pid=ImgRaw&r=0",
  },
  {
    name: "Rock",
    imgUrl:
      "https://th.bing.com/th/id/R.1073733133b0f07f13b3f066b773a7b3?rik=3u0%2b%2fkCFW5tl9A&pid=ImgRaw&r=0",
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

export default function GenrePage() {
  const genreStyles = css`
    gap: 12px;
    flex-wrap: wrap;
  `;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          Genre
        </Text>
      </Box>
      <Flex flexDirection={"row"} css={genreStyles.styles}>
        {genres.map((data, i) => {
          return (
            <Link to={data.name} key={i}>
              <Genre name={data.name} imgUrl={data.imgUrl} />
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
}
