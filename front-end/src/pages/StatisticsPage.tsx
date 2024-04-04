import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../state/store';
import styled from 'styled-components';
import {Box, Flex, Text} from 'rebass';
import { Analytics } from "@vercel/analytics/react"


const StyledBox = styled(Box)`
  background: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
  margin: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
`;

const StyledText = styled(Text)`
  color: #343a40;
  font-weight: bold;
`;
const Statistics = () => {
  const stats = useSelector((state: RootState) => state.stats);

  return (
    <>
      <Flex
        flexDirection='column'
        alignItems='center'
        style={{
          height: '100vh',
          overflow: 'auto',
        }}
      >
      
        <Flex flexDirection='column' alignItems='center'>
          <StyledText fontSize={[4, 5, 6]}>Statistics</StyledText>
          <Flex flexWrap='wrap' justifyContent='center'>
            <StyledBox>
              <StyledText>Total Songs: {stats.totalSongs}</StyledText>
            </StyledBox>
            <StyledBox>
              <StyledText>Total Artists: {stats.totalArtists}</StyledText>
            </StyledBox>
            <StyledBox>
              <StyledText>Total Albums: {stats.totalAlbums}</StyledText>
            </StyledBox>
            <StyledBox>
              <StyledText>Total Genres: {stats.totalGenres}</StyledText>
            </StyledBox>
          </Flex>
        </Flex>
        <Flex
          flexDirection={'row'}
          justifyContent={'space-around'}
          css={`
            gap: 10px;
            margin-top: 20px;
            margin-bottom: 200px;
          `}
        >
          <StyledBox>
            <StyledText>Genre Counts:</StyledText>
            {stats.genreCounts.map((item) => (
              <div key={item._id}>
                {item._id}: {item.count}
              </div>
            ))}
          </StyledBox>
          <StyledBox>
            <StyledText>Artist Song Counts:</StyledText>
            {stats.artistSongCounts.map((item) => (
              <div key={item._id}>
                {item._id}: {item.count}
              </div>
            ))}
          </StyledBox>
          <StyledBox>
            <StyledText>Album Song Counts:</StyledText>
            {stats.albumSongCounts.map((item) => (
              <div key={item._id}>
                {item._id}: {item.count}
              </div>
            ))}
          </StyledBox>
        </Flex>

        <Flex
          flexDirection={'row'}
          justifyContent={'space-around'}
          alignItems={'center'}
          css={`
            gap: 10px;
            margin-top: -140px;
          `}
        >
          <StyledBox>
            <StyledText>Album Counts Per Artist:</StyledText>
            {stats.albumCountsPerArtist.map((item) => (
              <div key={item._id}>
                Artist: {item.artist}, Number of Albums: {item.numberOfAlbums}
              </div>
            ))}
          </StyledBox>
        </Flex>
      </Flex>
      <Analytics />
    </>
  );
};

export default Statistics;