import React, { FC, useContext, useState, useMemo } from 'react';
import { UserContext } from '../../UserContext';
import { StartCommands } from '../Button/Start';
import { DeleteCommands } from '../Button/Delete';
import { LogCommands } from '../Button/Logs';
import { Container } from '../../types';
import { ListItem, Box, Typography, IconButton } from '@mui/material';

export const StoppedContainers: FC = () => {
  const { stoppedContainers } = useContext(UserContext);
  const [stopInvoked, setStop] = useState(false);

  const handleStopInvoke = () => {
    if (!stopInvoked) setStop(true);
    else setStop(false);
  };

  let stopped;

  const listItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #e0e0e0'
  }

  const imageInfoStyle = {
    flex: 1,
    marginRight: '16px',
  }

  const imageTitleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px'
  }

  const cmdbuttonStyle = {
    display: 'flex',
    gap: '8px',
  };

  const imageSubinfoStyle = {
    marginBottom: '4px',
  }

  const deleteButtonStyle = {
    color: 'red'
  }

  const playButtonStyle = {
    color: 'green'
  }

  const StoppedContainer: React.FC<{ el: Container; index: number }> = React.memo(
    ({ el, index }) => {
      return (
        <ListItem key={index}>
          <Box>
            <Typography variant='h6' style={imageTitleStyle} className='image-Title'>
              {el.Names}
            </Typography>
            <Box style={imageSubinfoStyle} className='image-subinfo'>
              <Typography>Image: {el.Image}</Typography>
              <Typography>Port: {el.Ports}</Typography>
            </Box>
          </Box>
          <Box style={imageInfoStyle} className='image-info'>
            <Box style={imageSubinfoStyle} className='image-subinfo'></Box>
          </Box>
          <Box style={cmdbuttonStyle} className='cmdbutton'>
            <IconButton style = {deleteButtonStyle} >
              <StartCommands
                name={el.Names}
                cmdRoute={new URL('/container/start', window.location.href)}
                fetchMethod='post'
                onClick={handleStopInvoke}
              />
            </IconButton>
            <IconButton style = {deleteButtonStyle} >
              <DeleteCommands
                name={el.Names}
                cmdRoute={new URL('/container/remove-specific-container', window.location.href)}
                fetchMethod='delete'
              />
            </IconButton>
            <IconButton style = {deleteButtonStyle} >
              <LogCommands
                name={el.Names}
                cmdRoute={new URL(`/container/log?name=${el.Names}`, window.location.href)}
                fetchMethod='get'
              />
            </IconButton>
          </Box>
        </ListItem>
      );
    }
  );

  if (typeof stoppedContainers === 'string') {
    stopped = (
      <div>
        <p>You have no running containers</p>
      </div>
    );
  } else {
    stopped = useMemo(
      () =>
        stoppedContainers.map((el, index) => (
          <StoppedContainer el={el} key={`stoppedcontainer${index}`} index={index} />
        )),
      [stoppedContainers]
    );
  }

  return <div className='dockercontainer'>{stopped}</div>;
};
