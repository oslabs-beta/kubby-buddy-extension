import React, { FC, useContext, useEffect, useState, useMemo } from 'react';
import { UserContext } from '../../UserContext';
// import { StartCommands } from '../Button/Start';
import { StopCommands } from '../Button/Stop';
import { DeleteCommands } from '../Button/Delete';
import { LogCommands } from '../Button/Logs';
// import { Graph } from '../Graph/Graph';
// import LineGraph from '../LineGraph/Line';
import Donut1 from '../Donut/DonutCPU';
import Loader from '../Loader/Loader';
import Donut2 from '../Donut/DonutMemory';
import { Container } from '../../types';
import { ListItem, Box, Typography, IconButton } from '@mui/material';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);
  // const [stopInvoked, setStop] = useState(false);
  const [change, setChange] = useState(false);

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

  const updateChange = () => {
    setChange((prevChange) => !prevChange);
  };

  const RunningContainer: React.FC<{ el: Container; index: number }> = React.memo(
    ({ el, index }) => {
      return (
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
            <IconButton style={deleteButtonStyle} className='delete-button'>
              <StopCommands
                name={el.Names}
                cmdRoute={new URL('/container/stop', window.location.href)}
                fetchMethod='post'
              />
            </IconButton>
            <IconButton style={deleteButtonStyle} className='delete-button'>
              <DeleteCommands
                name={el.Names}
                cmdRoute={new URL('/container/remove-specific-container', window.location.href)}
                fetchMethod='delete'
              />
            </IconButton>
            <IconButton>
              <LogCommands
                name={el.Names}
                cmdRoute={new URL(`/container/log?name=${el.Names}`, window.location.href)}
                fetchMethod='get'
              />
            </IconButton>
            <IconButton></IconButton>
            <Box>
              <Donut1 className='bargraph' data={98} />
            </Box>
            <Box>
              {statStream.length > 0 ? (
                <Donut2 className='bargraph' data={statStream[index]} />
              ) : (
                ''
              )}
            </Box>
            <Box>
              {statStream.length > 0 ?
                <Donut1 className='bargraph' data = { statStream[index]} />
                : ''}
            </Box>

            {/* <div className='chartContainer'>
                {statStream.length < 0 ? (
                  <Donut1 className='bargraph' data={98} />
                ) : (
                  ''
                )}
              </div>
              <div className='chartContainer'>
                
              </div>
              <div className='chartContainer'>
                {statStream.length > 0
                  ? //   <LineGraph
                    //     className="bargraph"
                    //     data={statStream[index]}
                    //     change={change}
                    //   />
                    ''
                  : ''}
              </div> */}
          </Box>
        </ListItem>
      );
    }
  );

  useEffect(() => {
    // Call the updateChange function whenever statStream is updated
    updateChange();
    console.log(runningContainers);
  }, [runningContainers, statStream]);

  let running;

  if (typeof runningContainers === 'string') {
    running = <Loader />;
  } else {
    running = useMemo(
      () =>
        runningContainers.map((el, index) => (
          <RunningContainer el={el} index={index} key={`runningcontainer-${index}`} />
        )),
      [runningContainers]
    );
  }

  return <div className='dockercontainer'>{running}</div>;
};

{
  /* <div className="container">
<div className="container-info">
  <div className="container-name">{el.Names}</div>
  <div className="subinfo">
    <p className="Imagename">Image: {el.Image}</p>
    <p className="Port">Port: {el.Ports}</p>
  </div>
</div>

<div className="cmdbutton">
  <StopCommands
    name={el.Names}
    cmdRoute={new URL('/container/stop', window.location.href)}
    fetchMethod="post"
  />

  <DeleteCommands
    name={el.Names}
    cmdRoute={
      new URL(
        '/container/remove-specific-container',
        window.location.href
      )
    }
    fetchMethod="delete"
  />
  <LogCommands
    name={el.Names}
    cmdRoute={
      new URL(`/container/log?name=${el.Names}`, window.location.href)
    }
    fetchMethod="get"
  />
</div>

<div className="chartContainer">
  {statStream.length > 0 ? (
    <Donut1 className="bargraph" data={statStream[index]} />
  ) : (
    ''
  )}
</div>
<div className="chartContainer">
  {statStream.length > 0 ? (
    <Donut2 className="bargraph" data={statStream[index]} />
  ) : (
    ''
  )}
</div>
<div className="chartContainer">
  {statStream.length > 0 ? (
  //   <LineGraph
  //     className="bargraph"
  //     data={statStream[index]}
  //     change={change}
  //   />
  ''
  ) : (
    ''
  )}
</div>
</div>
); */
}
