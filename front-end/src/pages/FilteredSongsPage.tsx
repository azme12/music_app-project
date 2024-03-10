import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import Music from "../components/Music";

interface Song {
  album: string;
  artist: string;
  coverImageUrl: string;
  createdAt: string;
  genre: string;
  title: string;
  updatedAt: string;
  _id: string;
}

function FilteredSongsPage() {
  const { genre } = useParams();
  const data = useSelector((state: RootState) => state.songs.songsByGenre);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "songsByGenre/fetchSongs", payload: { genre: genre } });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          {genre}
        </Text>
      </Box>
      <Box>
        {data.map((song: Song) => {
          return (
            <Music
              key={song._id} // Remember to provide a unique key prop when rendering a list of components
              artist={song.artist}
              title={song.title}
              album={song.album}
              date={song.createdAt}
              _id={song._id}
            />
          );
        })}
      </Box>
    </Flex>
  );
}

export default FilteredSongsPage;
