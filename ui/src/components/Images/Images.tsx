import React, { FC, useContext, useMemo } from 'react';
import { UserContext } from '../../UserContext';
import { CreateCommands } from '../../components/Button/Create';
import { DeleteImageCommands } from '../Button/DeleteImage';
import { ContainerCreatePopover } from '../Button/materialPopover';
import { Image } from '../../types';
import Loader from '../Loader/Loader';
import { ListItem, Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const Images: FC = () => {
  const { availableImages } = useContext(UserContext);

  let images;

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e0e0e0'
  };

  const imageInfoStyle = {
    flex: 1,
    marginRight: '16px'
  };

  const imageTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

  const imageSubinfoStyle = {
    marginBottom: '4px'
  };

  const cmdbuttonStyle = {
    display: 'flex',
    gap: '8px'
  };

  const deleteButtonStyle = {
    color: 'red'
  };


  const StoppedContainer: React.FC<{ el: Image; index: number }> = React.memo(({ el, index }) => {
    return (
      <ListItem style={listItemStyle} key={index}>
        <Box style={imageInfoStyle} className='image-info'>
          <Typography variant='h6' style={imageTitleStyle} className='image-title'>
            {el.Repository}
          </Typography>
          <Box style={imageSubinfoStyle} className='image-subinfo'>
            <Typography>Containers: {el.Containers}</Typography>
            <Typography>Time since created: {el.CreatedSince}</Typography>
          </Box>
        </Box>
        <Box style={imageInfoStyle} className='image-info'>
          <Box style={imageSubinfoStyle} className='image-subinfo'>
            <Typography>Created At: {el.CreatedAt}</Typography>
            <Typography>Size: {el.Size}</Typography>
          </Box>
        </Box>
        <Box style={imageInfoStyle} className='image-info'>
          <Box style={imageSubinfoStyle} className='image-subinfo'>
            <Typography>Tag: {el.Tag}</Typography>
            <Typography>ID: {el.ID}</Typography>
          </Box>
        </Box>
        <Box style={cmdbuttonStyle} className='cmdbutton'>
          <IconButton style={deleteButtonStyle} className='delete-button'>
            <DeleteImageCommands
              id={el.ID}
              cmdRoute={new URL('/container/remove-specific-container', window.location.href)}
              fetchMethod='delete'
            />
          </IconButton>
          <ContainerCreatePopover />
        </Box>
      </ListItem>
    );
  });

  if (typeof availableImages === 'string') {
    images = <Loader />;
  } else {
    images = useMemo(
      () =>
        availableImages.map((el, index) => (
          <StoppedContainer el={el} index={index} key={`image${index}`} />
        )),
      [availableImages]
    );
  }

  const imagesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  return <div style={imagesContainerStyle}>{images}</div>;
};
