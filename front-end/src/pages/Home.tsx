import {useEffect} from 'react';
import {Flex, Box, Text} from 'rebass';
import Music from '../components/Music';
import {css} from '@emotion/react';
import { Analytics } from "@vercel/analytics/react"
//
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/store';
//
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  songUrl?: string; // Make this property optional
  publicId?: string;
  userId?: string; // Make this property optional
  likes?: string[]; // Make this property optional
  __v?: Number;

  imageUrl?: string; // Make this property optional
}

function Home() {
  const data = useSelector((state: RootState) => state.songs.songs);

  const isLoading = useSelector(
    (state: RootState) => state.songs.getSongsLoading
  );
  const dispatch = useDispatch();
  const HomeStyle = css`
    width: 100%;
  `;

  useEffect(() => {
    dispatch({type: 'songs/fetchSongs'});
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <>
      <Flex flexDirection={'column'} css={HomeStyle.styles}>
        <Box>
          <Text fontSize={5} fontWeight='bold'>
            All Songs
          </Text>
        </Box>
        <Box>
          {isLoading
            ? 'Loading'
            : data.map((song: Song) => (
                <Music
                  key={song._id}
                  artist={song.artist}
                  title={song.title}
                  album={song.album}
                  genre={song.genre}
                  songUrl={song.songUrl}
                  likes={song.likes}
                  // imageUrl={}
                  _id={song._id}
                  //   date={song.createdAt.toISOString()}
                  
                  imageUrl={song.imageUrl}
                />
              ))}
        </Box>
      </Flex>
      <Analytics />
    </>
  );
}

export default Home;
