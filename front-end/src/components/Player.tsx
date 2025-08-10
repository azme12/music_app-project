import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styled from 'styled-components';
import { setCurrentSong } from '../state/songs/PlayerSlcie';
import { RootState } from '../state/store';
import { Song } from '../types/Song';

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

  const [trackIndex, setTrackIndex] = useState(0);

  const musicTracks = songs || [];

  useEffect(() => {
    if (songs && currentSongUrl) {
      const index = songs.findIndex((song) => song.songUrl === currentSongUrl);
      if (index !== -1) {
        setTrackIndex(index);
      }
    }
  }, [songs, currentSongUrl]);

  useEffect(() => {
    if (musicTracks[trackIndex]) {
      dispatch(setCurrentSong(musicTracks[trackIndex]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          src={musicTracks[trackIndex].songUrl}
          onPlay={() => {}}
          showSkipControls={true}
          showJumpControls={false}
          header={`Now playing: ${musicTracks[trackIndex].title}`}
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          onEnded={handleClickNext}
        />
      )}
    </Playercontainer>
  );
}