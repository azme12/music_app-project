import { Flex, Box, Text } from "rebass";
import { FaMusic, FaUser, FaCompactDisc, FaTags } from "react-icons/fa";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

// Define types for statistics
interface GenreCount {
  _id: string;
  count: number;
}
interface ArtistSongCount {
  _id: string;
  count: number;
}
interface AlbumSongCount {
  _id: string;
  count: number;
}
interface AlbumCountPerArtist {
  artist: string;
  numberOfAlbums: number;
}

const StatCard = styled(Box)`
  background: linear-gradient(135deg, #a8bcc3 60%, #e0e7ef 100%);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(30, 60, 90, 0.08);
  padding: 32px 24px;
  margin: 12px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 8px 32px rgba(30, 60, 90, 0.16);
    background: linear-gradient(135deg, #e0e7ef 60%, #a8bcc3 100%);
  }
`;

const StatNumber = styled(Text)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f3044;
  margin-bottom: 8px;
`;

const StatLabel = styled(Text)`
  font-size: 1.1rem;
  color: #4a5a6a;
  margin-bottom: 4px;
`;

const iconStyle = { fontSize: "2.2rem", marginBottom: "10px", color: "#e94f37" };

const StatisticsPage = () => {
  const stats = useSelector((state: RootState) => state.stats);
  return (
    <Flex flexDirection="column" alignItems="center" mt={4}>
      <Flex flexWrap="wrap" justifyContent="center" mb={4} sx={{ gap: 3 }}>
        <StatCard>
          <FaMusic style={iconStyle} />
          <StatNumber>{stats.totalSongs}</StatNumber>
          <StatLabel>Total Songs</StatLabel>
        </StatCard>
        <StatCard>
          <FaUser style={iconStyle} />
          <StatNumber>{stats.totalArtists}</StatNumber>
          <StatLabel>Total Artists</StatLabel>
        </StatCard>
        <StatCard>
          <FaCompactDisc style={iconStyle} />
          <StatNumber>{stats.totalAlbums}</StatNumber>
          <StatLabel>Total Albums</StatLabel>
        </StatCard>
        <StatCard>
          <FaTags style={iconStyle} />
          <StatNumber>{stats.totalGenres}</StatNumber>
          <StatLabel>Total Genres</StatLabel>
        </StatCard>
      </Flex>
      <Flex flexWrap="wrap" justifyContent="center" sx={{ gap: 4 }}>
        <Box bg="#fff3e0" p={3} m={2} sx={{ borderRadius: 8, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
          <Text fontWeight="bold" mb={2}>Genre Counts:</Text>
          {stats.genreCounts?.map((g: GenreCount) => (
            <Text key={g._id}>{g._id}: {g.count}</Text>
          ))}
        </Box>
        <Box bg="#e3f2fd" p={3} m={2} sx={{ borderRadius: 8, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
          <Text fontWeight="bold" mb={2}>Artist Song Counts:</Text>
          {stats.artistSongCounts?.map((a: ArtistSongCount) => (
            <Text key={a._id}>{a._id}: {a.count}</Text>
          ))}
        </Box>
        <Box bg="#f3e5f5" p={3} m={2} sx={{ borderRadius: 8, minWidth: 220, boxShadow: '0 2px 8px #0001' }}>
          <Text fontWeight="bold" mb={2}>Album Song Counts:</Text>
          {stats.albumSongCounts?.map((a: AlbumSongCount) => (
            <Text key={a._id}>{a._id}: {a.count}</Text>
          ))}
        </Box>
        <Box bg="#e8f5e9" p={3} m={2} sx={{ borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px #0001' }}>
          <Text fontWeight="bold" mb={2} fontSize={18} color="#388e3c" style={{display:'flex',alignItems:'center'}}>
            <FaUser style={{marginRight:8, color:'#43a047'}} /> Album Counts Per Artist:
          </Text>
          <Flex flexWrap="wrap" sx={{gap: 2, justifyContent: 'center', maxHeight: 220, overflowY: 'auto'}}>
            {stats.albumCountsPerArtist?.map((a: AlbumCountPerArtist, idx: number) => (
              <Box key={idx} bg="#fff" p={3} m={1} sx={{ borderRadius: 6, minWidth: 180, boxShadow: '0 1px 4px #0001', transition: 'box-shadow 0.2s', ':hover': { boxShadow: '0 4px 16px #43a04733', background: '#e0f2f1' } }}>
                <Text fontWeight="bold" color="#2e7d32" fontSize={16} mb={1}>
                  <FaUser style={{marginRight:6, color:'#43a047'}} /> {a.artist}
                </Text>
                <Text color="#388e3c" fontSize={15}>Albums: <b>{a.numberOfAlbums}</b></Text>
              </Box>
            ))}
          </Flex>
        </Box>
      </Flex>
      <Analytics />
    </Flex>
  );
};

export default StatisticsPage;