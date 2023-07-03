import React, { useEffect, useState, useRef } from 'react';
// import React, { useState } from "react";
import { IconButton, CardContent, Container, Popover } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { CommandButtonProps } from '../../types';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import SubjectIcon from '@mui/icons-material/Subject';


const ddClient = createDockerDesktopClient();

interface LogCommandProp extends CommandButtonProps {}

const LogButton: React.FC<LogCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const handleLog = async () => {
    const URL = cmdRoute;

    const response = ddClient.docker.cli.exec('container', ['logs', `${name}`]).then((result) => {
      const parsed: any = result.stdout.split('\n');
      setData(parsed);
    });
    // const response = await fetch(URL, {
    //   method: fetchMethod,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const data = await response.json();
    setData(data);
    setData(data.reverse());
    setShowList(true);
  };

  function cleanLogData(log: any) {
    const cleanedLog = JSON.stringify(log)
      .replace(/[{}]/g, '')
      .replace(/"/g, '')
      .replace(/\$/g, '')
      .replace(/[{}"]/g, '')
      .replace(/:/g, ': ')
      .replace(/,/g, ', ');
    
    const ind = cleanedLog.indexOf('msg')
    const firstHalf = cleanedLog.slice(ind + 7)
    console.log(firstHalf)
    const ind2 = firstHalf.indexOf('\\')
    const result = firstHalf.slice(0, ind2)
    // console.log('result', result)
    return result;
  }

  const closeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: any) => {
      if (closeRef.current && !closeRef.current.contains(e.target as Node)) {
        setShowList(false);
      }
    };
    document.addEventListener('mousedown', handler);
  });

  const stopButtonStyle = {
    color: 'black'
  };

  const handleClose = () => {
    setShowList(false);
  };

  return (
    <div>
      <IconButton onClick={handleLog}>
        <FormatListNumberedIcon style={stopButtonStyle} />
      </IconButton>
      <Popover
        open={showList}
        // anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        sx={{
          width: '70%',
          left: '15%',
          right: '15%',
          top: 0,
          bottom: 0,
          // position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        {/* <CardContent>
          <Container
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className='modal-content' ref={closeRef}>
              <div className={`log-window ${showList ? 'active' : 'inactive'}`}>
                <div className='Text'>Logs</div>
                <ul>
                  {data.map((log, index) => (
                    <li className='containerLogs' key={index}>
                      {cleanLogData(log)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </CardContent> */}
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Logs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    <b>{index + 1}.</b> {cleanLogData(row)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </div>
  );
};

export const LogCommands: React.FC<LogCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px'
  };
  return (
    <div className='startCommand-container'>
      <LogButton style={cmdbuttonStyle} name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
    </div>
  );
};

// {showList && (
//   <ScrollArea.Root className="ScrollAreaRoot modal">
//     <ScrollArea.Viewport className="ScrollAreaViewport modal-content">
//       <button className="close-button" onClick={closeModal}>
//         Close
//       </button>
//       <div className={`log-window ${showList ? 'active' : 'inactive'}`} style={{ padding: '15px 20px' }}>
//         <div className="Text">Logs</div>
//         {data.map((tag) => (
//           <div className="Tag" key={tag}>
//             {cleanLogData(tag)}
//           </div>
//         ))}
//         {/* <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
//           <ScrollArea.Thumb className="ScrollAreaThumb" />
//         </ScrollArea.Scrollbar>
//         <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
//           <ScrollArea.Thumb className="ScrollAreaThumb" />
//         </ScrollArea.Scrollbar>
//         <ScrollArea.Corner className="ScrollAreaCorner" /> */}
//       </div>
//     </ScrollArea.Viewport>
//   </ScrollArea.Root>
// )}
