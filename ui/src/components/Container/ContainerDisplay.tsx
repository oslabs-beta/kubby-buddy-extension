//@ts-ignore
import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { StopCommands } from '../Button/Stop';
import { LogCommands } from '../Button/Logs';
import Loader from '../Loader/Loader';
// import { Graph } from '../Graph/Graph';
import Donut1 from '../Donut/DonutCPU';
import Donut2 from '../Donut/DonutMemory';
import {
  ListItem,
  Box,
  Typography,
  IconButton,
  Collapse,
  Card,
  Container,
  CardContent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LineChart from '../LineGraph/Line';
import { Collapsable } from './Collapsable';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);

  const [change, setChange] = useState(false);
  const [open, setOpen] = useState(-1);

  const updateChange = () => {
    setChange((prevChange) => !prevChange);
  };

  useEffect(() => {
    // Call the updateChange function whenever statStream is updated
    updateChange();
    console.log(runningContainers);
  }, [runningContainers, statStream]);

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

  const cmdbuttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px'
  };

  const imageSubinfoStyle = {
    marginBottom: '4px'
  };

  const deleteButtonStyle = {
    color: 'red'
  };

  const playButtonStyle = {
    color: 'green'
  };

  const handleOpen = (input: number): void => {
    if (open === input) {
      setOpen(-1);
    } else {
      setOpen(input);
    }
  };
  let running = runningContainers.map((el, index) => (
    <div>
      <ListItem style={listItemStyle} key={index}>
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
          <StopCommands
            name={el.Names}
            cmdRoute={new URL('/container/stop', window.location.href)}
            fetchMethod='post'
          />

          <LogCommands
            name={el.Names}
            cmdRoute={new URL(`/container/log?name=${el.Names}`, window.location.href)}
            fetchMethod='get'
          />

          <Box style={imageInfoStyle}>
            {statStream.length > 0 ? (
              <Donut2
                shouldUpdate={statStream[index]}
                className='bargraph'
                data={statStream[index]}
              />
            ) : (
              ''
            )}
          </Box>
          <Box style={imageInfoStyle}>
            {statStream.length > 0 ? (
              <Donut1
                shouldUpdate={statStream[index]}
                className='bargraph'
                data={statStream[index]}
              />
            ) : (
              ''
            )}
          </Box>
        </Box>
        <IconButton aria-label='expand row' size='small' onClick={() => handleOpen(index)}>
          {open === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItem>
      <ListItem >
        <Collapsable id={index} open={open} statStream={statStream} />
      </ListItem>
    </div>
  ));

  return <div className='dockercontainer'>{running}</div>;
};
