import React, { useContext } from 'react';
import start from '../../../public/favicon.png';
import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { createDockerDesktopClient } from '@docker/extension-api-client';

const ddClient = createDockerDesktopClient();
interface StartCommandProp extends CommandButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const { setStoppedContainers, setRunningContainers, stoppedContainers, runningContainers } =
    useContext(UserContext);
  //helper
  const command = async () => {
    try {
      let data;
      const URL = cmdRoute;
      const response = ddClient.docker.cli.exec('start', [`${name}`]).then((result) => {
        const parsed = result.parseJsonLines();
        data = parsed;
      });
      // const response = await fetch(URL, {
      //   method: fetchMethod,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name: name }),
      // });
     
     

      const containerToStart = stoppedContainers.find((container) => container.Names === name);

      if (containerToStart) {
        setStoppedContainers(stoppedContainers.filter((container) => container.Names !== name));
        setRunningContainers([...runningContainers, containerToStart]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const stopButtonStyle = {
    color: 'green'
  };

  return (
    <IconButton onClick={command}>
      <PlayArrowIcon className='start' />
    </IconButton>
  );
};

export const StartCommands: React.FC<StartCommandProp> = ({
  name,
  cmdRoute,
  fetchMethod,
  onClick
}) => {
  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px'
  };

  return (
    <div className='startCommand-container'>
      <StartButton
        style={cmdbuttonStyle}
        name={name}
        cmdRoute={cmdRoute}
        fetchMethod={fetchMethod}
        onClick={onClick}
      />
    </div>
  );
};
