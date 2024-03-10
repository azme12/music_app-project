import {Box, Flex, Text} from 'rebass';
import {SlOptionsVertical} from 'react-icons/sl';
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa6';
import {MdOutlineEdit} from 'react-icons/md';
import {MdDelete} from 'react-icons/md';
import {FaRegCircleCheck} from 'react-icons/fa6';

import {css, keyframes} from '@emotion/react';
import styled from '@emotion/styled';

import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../state/store';
import SuccessToast from './Toasts/SuccessToast';
import {
  setOpenDeleteModal,
  setmarkDeletedItem,
} from '../state/songs/songsSlice';
import FailedToast from './Toasts/FailedToast';

import {pauseSong, playSong, setCurrentSong} from '../state/songs/PlayerSlcie';
const StyledOption = styled(SlOptionsVertical)`
  position: relative; // Set position to relative
  z-index: 1; // Set a lower z-index value
  margin-right: 10px;
  font-size: 20px;
`;
const EditIcon = styled(MdOutlineEdit)`
  margin-right: 10px;
  font-size: 20px;
  z-index: 0px;
`;
const StyledRemoveIcon = styled(MdDelete)`
  margin-right: 10px;
  font-size: 20px;
`;

type myComponentProp = {
  album: string;
  artist: string;
  genre?: string;

  songUrl?: string;
  date: string;
  title: string;
  _id?: string;
};
const Music: React.FC<myComponentProp> = ({
  album,
  artist,
  genre,
  songUrl,
  date,
  title,
  _id,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
  const currentSong = useSelector(
    (state: RootState) => state.player.currentSong?.songUrl
  );
  const [previousPlayingState, setPreviousPlayingState] =
    useState<boolean>(false); // Store the previous playing state

  const [isLoading, setIsLoading] = useState(true);

  const [optionIsOpened, setOptionIsOpened] = useState(false);
  const [markedItem, setMarkedItem] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const showSuccessToast = useSelector(
    (state: RootState) => state.songs.showSuccessToast
  );
  const showFailedToast = useSelector(
    (state: RootState) => state.songs.showFailedToast
  );

  // to open option
  const handleOptionClick = (e: any) => {
    e.stopPropagation();
    setOptionIsOpened((prev) => !prev);
  };

  const deleteSong = (id: string | unknown) => {
    dispatch({type: 'song/deleteSongById', payload: {songid: id}});
    closeModal();
  };

  const openModal = () => {
    setOpenDeleteModal(true);
    setOptionIsOpened(false);
    setMarkedItem(true);
    // dispatch(setOpenDeleteModal(true))
    // dispatch(setmarkDeletedItem(true))
  };

  const closeModal = () => {
    setMarkedItem(false);
    setOpenDeleteModal(false);
    // dispatch(setOpenDeleteModal(false))
    // dispatch(setmarkDeletedItem(false))
    console.log('close');
  };
  console.log(markedItem);

  const StyledBackGround = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: ${optionIsOpened ? 'block' : 'none'};
    height: 100vh;
    width: 100%;
  `;
  const Button = styled.button`
    padding: 15px 30px;
    background-color: #bd1e51;
    color: #e1f2f7;
    border: none;
    border-radius: 10px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  `;
  const Button2 = styled.button`
    padding: 15px 30px;
    background-color: #f0f8ff;

    border: none;
    border-radius: 10px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      font-weight: bold;
      transform: scale(1.05);
    }
  `;

  const StyledContent = styled.div`
    z-index: 10;
    font-size: 17px;
    position: absolute;
    min-width: 100px;
    background-color: #d0e3f0;
    box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.1);
    border-radius: 10px;
    margin-right: 5px;
    display: ${optionIsOpened ? 'block' : 'none'};

    text-decoration: none;
    right: 0;
  `;
  const StyledButton = styled.div`
    padding: 5px 2px;
    border: none;
  `;
  const spotifyStyle = css`
    color: #1f3044;
    padding: 4px 4px;
    border-radius: 8px;
    background-color: ${optionIsOpened ? '#a8bcc3' : ''};
    background-color: ${markedItem ? '#a8bcc3' : ''};
    max-width: 800px;
    &: hover {
      background-color: #a8bcc3;
    }
    transition: all 0.5s ease;
  `;
  const playTitle = css`
    gap: 20px;
  `;

  const boxStyle = css`
    margin-right: 10px; /* Adjust the margin as needed */
  `;

  const hiddenOnSmallScreen = css`
    @media (max-width: 768px) {
      display: none;
    }
  `;
  const titleStyle = css`
    height: 40px;
  `;
  const StyledOptionContainer = css`
    cursor: pointer;
    position: relative;
  `;
  const StyledlementsMenuebarContent = css`
    &:hover {
      color: #1ba098;
    }
    transition: 0.4s;
  `;
  // Define animation keyframes
  const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

  // Define styles for the modal overlay
  const overlayStyles = css`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Define styles for the modal content
  const modalStyles = css`
    display: flex;
    flex-direction: column;
    background-color: #f0f8ff;
    gap: 10px;

    padding: 20px;
    border-radius: 8px;
    animation: ${fadeIn} 0.3s ease; /* Apply animation to modal content */
    @media (max-width: 768px) {
    }
  `;

  const Overlay = styled.div`
    ${overlayStyles}
  `;

  const ModalContent = styled.div`
    ${modalStyles}
  `;

  function formatDate(date: string): string {
    const dateObject: Date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate: string = dateObject.toLocaleDateString(
      'en-US',
      options
    );

    return formattedDate;
  }

  const StyledSpan = styled.span`
    font-weight: bold;
  `;
  const handlePlayPause = () => {
    if (isPlaying && currentSong === songUrl) {
      // Only set previous state if it was previously playing
      if (previousPlayingState) {
        setPreviousPlayingState(false);
      }
      dispatch(pauseSong());
    } else {
      setPreviousPlayingState(isPlaying); // Remember the previous state before playing
      dispatch(setCurrentSong({title: title, songUrl: songUrl}));
      dispatch(playSong());
    }
  };
  const handleDeleteClick = (_id: string) => {
    navigate(`/editSong/${_id}`);
    //to={`/editSong/${_id}`}
  };

  return (
    <>
      <div onClick={handlePlayPause} style={{cursor: 'pointer'}}>
        <SuccessToast isToastVisible={showSuccessToast} />
        <FailedToast isToastVisible={showFailedToast} />

        {/* Render modal if isOpen is true */}
        {openDeleteModal && (
          <Overlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Text fontSize={4} fontWeight={'bold'}>
                Delete from your Songs?
              </Text>
              <Text>
                This will delete <StyledSpan>{title}</StyledSpan> from Your
                Songs.
              </Text>
              <Flex
                flexDirection={'row'}
                justifyContent={'flex-end'}
                css={`
                  gap: 10px;
                  margin-top: 20px;
                `}
              >
                <Button2 onClick={closeModal}>Cancel</Button2>
                <Button onClick={() => deleteSong(_id)}>Delete</Button>
              </Flex>
            </ModalContent>
          </Overlay>
        )}
        <StyledBackGround onClick={handleOptionClick}></StyledBackGround>
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          css={spotifyStyle.styles}
        >
          <Flex
            flexDirection={'row'}
            alignItems={'center'}
            flex={1.5}
            css={playTitle.styles}
          >
            <Box ml={2}>{true ? <FaPlay /> : <FaPause />}</Box>
            <Box>
              <img
                style={{width: '45px', height: '45px', borderRadius: '5px'}}
                src={
                  'https://res.cloudinary.com/dptx5wjus/image/upload/v1709818960/post-images/Graphicloads-Android-Settings-Songs.512_llg4rc.png'
                }
              />
            </Box>
            <Flex
              flexDirection={'column'}
              justifyContent={'space-between'}
              css={titleStyle.styles}
            >
              <Box>
                <Text fontSize={16} fontWeight='bold'>
                  {title}
                </Text>
              </Box>
              <Box>
                <Text fontSize={14}>{artist}</Text>
              </Box>
            </Flex>
          </Flex>
          <Box
            css={[boxStyle.styles, hiddenOnSmallScreen.styles]}
            flex={1}
            mr={2}
          >
            <Text
              fontSize={14}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {album}
            </Text>
          </Box>
          <Box css={[boxStyle.styles, hiddenOnSmallScreen.styles]} flex={1}>
            <Text fontSize={14}>{formatDate(date)}</Text>
          </Box>
          <Box css={StyledOptionContainer.styles}>
            <StyledOption onClick={handleOptionClick} />
            {optionIsOpened === true ? (
              <StyledContent onClick={(e) => e.stopPropagation()}>
                <div
                  //to={`/editSong/${_id}`}
                  onClick={(event) => handleDeleteClick(_id)}
                  style={{textDecoration: 'none', color: '#1f3044'}}
                >
                  <Flex
                    flexDirection={'row'}
                    alignItems={'center'}
                    p={2}
                    css={StyledlementsMenuebarContent.styles}
                  >
                    <Box>
                      <EditIcon />
                    </Box>

                    <Box>
                      <StyledButton>Edit</StyledButton>
                    </Box>
                  </Flex>
                </div>
                <Flex
                  flexDirection={'row'}
                  alignItems={'center'}
                  p={2}
                  css={StyledlementsMenuebarContent.styles}
                  onClick={(e) => openModal(e)}
                >
                  <Box>
                    <StyledRemoveIcon />
                  </Box>
                  <Box>
                    <StyledButton>Remove</StyledButton>
                  </Box>
                </Flex>
              </StyledContent>
            ) : (
              ''
            )}
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default Music;
