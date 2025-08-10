import {useEffect} from 'react';
import {Flex, Box, Text, Button} from 'rebass';
import {FaPlay, FaPause, FaHeart, FaMusic} from 'react-icons/fa';
import styled from '@emotion/styled';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/store';
import React, {useState} from 'react';
import { Analytics } from "@vercel/analytics/react"
import { Song } from '../types/Song';

const SongCard = styled(Flex)`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0001;
  margin-bottom: 18px;
  align-items: center;
  padding: 18px 24px;
  transition: box-shadow 0.2s, background 0.2s;
  &:hover {
    box-shadow: 0 6px 24px #0002;
    background: #f0f8ff;
  }
`;
const PlayButton = styled(Button)`
  background: #e94f37;
  color: #fff;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 18px;
  box-shadow: 0 2px 8px #e94f3722;
  &:hover {
    background: #d43c23;
  }
`;
const SongInfo = styled(Flex)`
  flex-direction: column;
  flex: 1;
`;
const SongTitle = styled(Text)`
  font-size: 1.3rem;
  font-weight: bold;
  color: #1f3044;
`;
const SongArtist = styled(Text)`
  font-size: 1rem;
  color: #4a5a6a;
`;
const SongMeta = styled(Flex)`
  gap: 18px;
  margin-top: 6px;
`;
const LikeButton = styled(Button)`
  background: none;
  color: #e94f37;
  font-size: 1.3rem;
  margin-left: 10px;
  &:hover {
    color: #d43c23;
    background: none;
  }
`;
//
function Home() {
  const data = useSelector((state: RootState) => state.songs.songs);

  const isLoading = useSelector(
    (state: RootState) => state.songs.getSongsLoading
  );
  const dispatch = useDispatch();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [liked, setLiked] = useState<{ [id: string]: boolean }>({});

  const handlePlay = (id: string) => {
    setPlayingId(id === playingId ? null : id);
    const song = data.find((s: Song) => s._id === id);
    if (song) {
      dispatch({ type: 'player/setCurrentSong', payload: song });
    }
  };
  const handleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    dispatch({type: 'songs/fetchSongs'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <>
      <Flex flexDirection='column' alignItems='center' width='100%' p={4}>
        <Text fontSize={6} fontWeight='bold' mb={3} color='#1f3044'>
          <FaMusic style={{ marginRight: 10, color: '#e94f37' }} /> All Songs
        </Text>
        <Box width='100%' maxWidth={900}>
          {isLoading
            ? 'Loading'
            : data.map((song: Song) => (
                <SongCard key={song._id}>
                  <PlayButton onClick={() => handlePlay(song._id!)}>
                    {playingId === song._id ? <FaPause /> : <FaPlay />}
                  </PlayButton>
                  <SongInfo>
                    <SongTitle>{song.title}</SongTitle>
                    <SongArtist>{song.artist} &bull; {song.album} &bull; {song.genre}</SongArtist>
                    <SongMeta>
                      <Text fontSize={13} color='#888'>Album: {song.album}</Text>
                      <Text fontSize={13} color='#888'>Genre: {song.genre}</Text>
                    </SongMeta>
                  </SongInfo>
                  <LikeButton onClick={() => handleLike(song._id!)}>
                    <FaHeart color={liked[song._id!] ? '#e94f37' : '#bbb'} />
                  </LikeButton>
                </SongCard>
              ))}
        </Box>
      </Flex>
      <Analytics />
    </>
  );
}

export default Home;
