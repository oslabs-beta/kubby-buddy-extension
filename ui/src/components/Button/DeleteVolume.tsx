import React, { useContext } from 'react';
// import trash from '../../../public/favicon.png';
import { UserContext } from '../../UserContext';
import { CommandButtonProps } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient();

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteVolumeButton: React.FC<DeleteCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const { setAvailableVolumes, availableVolumes } = useContext(UserContext);

  const command = async () => {
    console.log(name);
    try {
      let data;
      const response = ddClient.docker.cli.exec('volume', ['rm', `${name}`]).then((result) => {
        console.log(result);
        data = result;
        if (result) {
          setAvailableVolumes(availableVolumes.filter((volume) => volume.Name !== name));
          }
      });
      console.log('test---->:' + data);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteButtonStyle = {
    color: 'black'
  };

  return (
    <IconButton onClick={command}>
      <DeleteIcon style={deleteButtonStyle} />
    </IconButton>
  );
};

export const DeleteVolumeCommands: React.FC<DeleteCommandProp> = ({ name, cmdRoute, fetchMethod }) => {

  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px'
  };

  return <DeleteVolumeButton name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />;
};
