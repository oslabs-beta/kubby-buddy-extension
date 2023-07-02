//@ts-ignore
import React, { FC, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext';
import { StopCommands } from '../Button/Stop';
import { LogCommands } from '../Button/Logs';
import Loader from '../Loader/Loader';
// import { Graph } from '../Graph/Graph';
import LineGraph from '../LineGraph/Line';
import Donut1 from '../Donut/DonutCPU';
import Donut2 from '../Donut/DonutMemory';
import { ListItem, Box, Typography, IconButton } from '@mui/material';

export const DisplayRunning: FC = () => {
  const { runningContainers, statStream } = useContext(UserContext);

  const [change, setChange] = useState(false);

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
  let running = runningContainers.map((el, index) => (
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
        {/* <IconButton style={deleteButtonStyle} className='delete-button'>
            <DeleteCommands
              name={el.Names}
              cmdRoute={new URL('/container/remove-specific-container', window.location.href)}
              fetchMethod='delete'
            />
          </IconButton> */}
        <IconButton>
          <LogCommands
            name={el.Names}
            cmdRoute={new URL(`/container/log?name=${el.Names}`, window.location.href)}
            fetchMethod='get'
          />
        </IconButton>
        <IconButton></IconButton>
        <Box style={imageInfoStyle} >
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
        <Box style={imageInfoStyle} >
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
    </ListItem>
  ));

  return <div className='dockercontainer'>{running}</div>;
};

// import { Container } from '../../types';
// import { ListItem, Box, Typography, IconButton } from '@mui/material';
// import { createDockerDesktopClient } from '@docker/extension-api-client';
// const ddClient = createDockerDesktopClient();

// export const DisplayRunning: FC = () => {
//   const { runningContainers, statStream, setStatStream } = useContext(UserContext);

//   // useEffect(() => {
//   //   console.log(runningContainers);
//   // }, [runningContainers]);

//   // const listItemStyle = {
//   //   display: 'flex',
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   padding: '16px',
//   //   borderBottom: '1px solid #e0e0e0'
//   // };

//   // const imageInfoStyle = {
//   //   flex: 1,
//   //   marginRight: '16px'
//   // };

//   // const imageTitleStyle = {
//   //   fontSize: '18px',
//   //   fontWeight: 'bold',
//   //   marginBottom: '8px'
//   // };

//   // const cmdbuttonStyle = {
//   //   display: 'flex',
//   //   gap: '8px'
//   // };

//   // const imageSubinfoStyle = {
//   //   marginBottom: '4px'
//   // };

//   // const deleteButtonStyle = {
//   //   color: 'red'
//   // };

//   // const playButtonStyle = {
//   //   color: 'green'
//   // };

//   const RunningContainer: React.FC<{ el: Container; index: number }> = ({ el, index }) => {
//     return (
//       <ListItem style={listItemStyle} key={index}>
//         <Box>
//           <Typography variant='h6' style={imageTitleStyle} className='image-Title'>
//             {el.Names}
//           </Typography>
//           <Box style={imageSubinfoStyle} className='image-subinfo'>
//             <Typography>Image: {el.Image}</Typography>
//             <Typography>Port: {el.Ports}</Typography>
//           </Box>
//         </Box>
//         <Box style={imageInfoStyle} className='image-info'>
//           <Box style={imageSubinfoStyle} className='image-subinfo'></Box>
//         </Box>
//         <Box style={cmdbuttonStyle} className='cmdbutton'>
//           <IconButton style={deleteButtonStyle} className='delete-button'>
//             <StopCommands
//               name={el.Names}
//               cmdRoute={new URL('/container/stop', window.location.href)}
//               fetchMethod='post'
//             />
//           </IconButton>
//           <IconButton style={deleteButtonStyle} className='delete-button'>
//             <DeleteCommands
//               name={el.Names}
//               cmdRoute={new URL('/container/remove-specific-container', window.location.href)}
//               fetchMethod='delete'
//             />
//           </IconButton>
//           <IconButton>
//             <LogCommands
//               name={el.Names}
//               cmdRoute={new URL(`/container/log?name=${el.Names}`, window.location.href)}
//               fetchMethod='get'
//             />
//           </IconButton>
//           <IconButton></IconButton>

//           {statStream.length > 0 ? (
//             <Donut2
//               shouldUpdate={statStream[index]}
//               className='bargraph'
//               data={statStream[index]}
//             />
//           ) : (
//             ''
//           )}

//           {statStream.length > 0 ? (
//             <Donut1
//               shouldUpdate={statStream[index]}
//               className='bargraph'
//               data={statStream[index]}
//             />
//           ) : (
//             ''
//           )}
//         </Box>
//       </ListItem>
//     );
//   };

//   let running;

//   if (typeof runningContainers === 'string') {
//     running = <Loader />;
//   } else {
//     running = runningContainers.map((el, index) => (
//       <RunningContainer el={el} index={index} key={`runningcontainer-${index}`} />
//     ));
//   }

//   return <div className='dockercontainer'>{running}</div>;
// };
