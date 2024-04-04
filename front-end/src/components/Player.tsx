import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { setCurrentSong } from '../state/songs/PlayerSlcie';
import { RootState } from '../state/store';

interface Song {
  _id: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  songUrl: string;
  userId: string;
  likes: number;
}

interface PlayerProps {
  songs: Song[];
}

const Playercontainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default function Player({ songs }: PlayerProps) {
  const dispatch = useDispatch();
  const currentSongUrl = useSelector((state: RootState) => state.player.currentSong?.songUrl);
  const currentSongTitle = useSelector((state: RootState) => state.player.currentSong?.title);

  const [trackIndex, setTrackIndex] = useState(0);

  const musicTracks = songs
    ? songs.map((song) => ({
        title: song.title,
        songUrl: song.songUrl,
      }))
    : [];

  useEffect(() => {
    if (songs) {
      const index = songs.findIndex((song) => song.songUrl === musicTracks[trackIndex].songUrl);
      if (index !== -1) {
        setTrackIndex(index);
      }
    }
  }, [songs]);

  useEffect(() => {
    if (musicTracks[trackIndex]) {
      dispatch(setCurrentSong(musicTracks[trackIndex]));
    }
  }, [trackIndex]);

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) => (currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1));
  };

  const handleClickNext = () => {
    setTrackIndex((currentTrack) => (currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0));
  };

  return (
    <Playercontainer>
      {musicTracks[trackIndex] && (
        <AudioPlayer
          autoPlay
          src={currentSongUrl ? currentSongUrl : musicTracks[trackIndex].songUrl}
          onPlay={(e) => console.log('onPlay')}
          showSkipControls={true}
          showJumpControls={false}
          header={`Now playing: ${
            currentSongTitle ? currentSongTitle : musicTracks[trackIndex].title
          }`}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
        />
      )}
    </Playercontainer>
  );
}