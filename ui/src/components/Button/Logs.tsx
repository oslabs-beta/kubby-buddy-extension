import React, { useEffect, useState, useRef } from 'react';
// import React, { useState } from "react";
import { IconButton } from '@mui/material'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { CommandButtonProps } from '../../types';
import { createDockerDesktopClient } from '@docker/extension-api-client'

const ddClient = createDockerDesktopClient()

interface LogCommandProp extends CommandButtonProps {}

const LogButton: React.FC<LogCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const [data, setData] = useState([]);
  const [showList, setShowList] = useState(false);
  const handleLog = async () => {
    const URL = cmdRoute;
    
    const response = ddClient.docker.cli
      .exec('container', ['logs', `${name}`])
      .then(result => {
        const parsed: any = result.stdout.split('\n')
        setData(parsed)
      })
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
    return cleanedLog;
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
  }

  return (
    <div>
      <IconButton onClick={handleLog}>
      <FormatListNumberedIcon
          style={stopButtonStyle}
        
      />
      </IconButton>
      {showList && (
        <div className="modal">
          <div className="modal-content" ref={closeRef}>
            <div className={`log-window ${showList ? 'active' : 'inactive'}`}>
              <div className="Text">Logs</div>
              <ul>
                {data.map((log, index) => (
                  <li className="containerLogs" key={index}>
                    {cleanLogData(log)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const LogCommands: React.FC<LogCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
  };
  return (
    <div className="startCommand-container">
      <LogButton style = {cmdbuttonStyle} name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
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
