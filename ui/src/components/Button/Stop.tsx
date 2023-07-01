import React, { useContext } from 'react';
import stop from '../../../public/favicon.png';
import { CommandButtonProps } from '../../types';
import { UserContext } from '../../UserContext';
import StopIcon from '@mui/icons-material/Stop'
import { IconButton } from '@mui/material'

// import { StoppedContainers } from '../Container/StoppedContainers';
import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient()
interface StopCommandProps extends CommandButtonProps {
  // onClick: ()=> void;
}

const StopButton: React.FC<StopCommandProps> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {
  const {
    setStoppedContainers,
    setRunningContainers,
    stoppedContainers,
    runningContainers,
  } = useContext(UserContext);
  const command = async () => {
    try {
      let data
      const URL = cmdRoute;
      const response = ddClient.docker.cli
        .exec('stop', [`${name}`])
        .then((result) => (data = result.parseJsonLines()));
      // const response = await fetch(URL, {
      //   method: fetchMethod,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name: name }),
      // });
      //  data = await response.json();
      console.log('----', data);
      console.log(cmdRoute, 'this is the route');
      console.log(runningContainers[0]);

      setStoppedContainers([
        ...stoppedContainers,
        ...runningContainers.filter((container) => container.Names === name),
      ]);
      setRunningContainers(
        runningContainers.filter((container) => container.Names !== name)
      );
    } catch (err) {
      console.error(err);
    }
  };
  const stopButtonStyle = {
    color: 'red'
  }
  return (
    <IconButton onClick={command}>
      <StopIcon
        className="stop"
        style = {stopButtonStyle}
       
        
      />
    </IconButton>
  );
};

export const StopCommands: React.FC<StopCommandProps> = ({
  name,
  cmdRoute,
  fetchMethod,
}) => {

  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px',
  };
  return (
    <div className="stopCommand-container">
      <StopButton style={cmdbuttonStyle}  name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />
    </div>
  );
};

// export const StopButton: React.FC = () => {
//   //helper
//   const handleStop = async () => {
//     try {
//       const response = await fetch("/container/log", {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: `container-name` }),
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button
//       style={{ backgroundImage: `url(${stop})` }}
//       onClick={handleStop}
//     ></button>
//   );
// };
