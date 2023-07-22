import React, { FC, useContext, useMemo } from 'react';
import { UserContext } from '../../UserContext';
import { DeleteVolumeCommands } from '../Button/DeleteVolume';
import { Volume } from '../../types';
import Loader from '../Loader/Loader';
import { ListItem, Box, Typography } from '@mui/material';

export const Volumes: FC = () => {
  const { availableVolumes } = useContext(UserContext);

  let volumes;

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e0e0e0'
  };

  const volumeInfoStyle = {
    flex: 1,
    marginRight: '16px',
  };

  const volumeTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

  const volumeSubinfoStyle = {
    marginBottom: '4px',
  };

  const cmdbuttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  };

  const StoppedContainer: React.FC<{ el: Volume; index: number }> = React.memo(({ el, index }) => {
    return (
      <ListItem style={listItemStyle} key={index}>
        <Box style={volumeInfoStyle} className='volume-info'>
          <Typography variant='h6' style={volumeTitleStyle} className='volume-title'>
            {el.Name}
          </Typography>
          <Box style={volumeSubinfoStyle} className='volume-subinfo'>
            <Typography>Availability: {el.Availability}</Typography>
            <Typography>Status: {el.Status}</Typography>
          </Box>
        </Box>
        <Box style={volumeInfoStyle} className='volume-info'>
          <Box style={volumeSubinfoStyle} className='volume-subinfo'>
            <Typography>Labels: {el.Labels}</Typography>
            <Typography>Size: {el.Size}</Typography>
          </Box>
        </Box>
        <Box style={volumeInfoStyle} className='volume-info'>
          <Box style={volumeSubinfoStyle} className='volume-subinfo'>
            <Typography>Driver: {el.Driver}</Typography>
            <Typography>Group: {el.Group}</Typography>
          </Box>
        </Box>
        <Box style={volumeInfoStyle} className='volume-info'>
          <Box style={volumeSubinfoStyle} className='volume-subinfo'>
            <Typography>Links: {el.Links}</Typography>
            <Typography>Scope: {el.Scope}</Typography>
          </Box>
        </Box>
        <Box style={cmdbuttonStyle} className='cmdbutton'>
            <DeleteVolumeCommands name={el.Name} cmdRoute={new URL('/volume/remove-specific-volume', window.location.href)} fetchMethod='delete' />
        </Box>
      </ListItem>
    );
  });

  if (typeof availableVolumes === 'string') {
    volumes = <Loader />;
  } else {
    volumes = useMemo(
      () =>
        availableVolumes.map((el, index) => (
          <StoppedContainer el={el} index={index} key={`volume${index}`} />
        )),
      [availableVolumes]
    );
  }

  const volumesContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  return <div style={volumesContainerStyle}>{volumes}</div>;
};
