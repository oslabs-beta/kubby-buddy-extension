// /prune-stopped-containers

import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { CommandButtonProps } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient();
interface DeleteCommandProp extends CommandButtonProps {}

const DeleteButton: React.FC<DeleteCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  //helper
  const { setStoppedContainers, stoppedContainers } = useContext(UserContext);

  const command = async () => {
    try {
      ddClient.docker.cli.exec('rm', [`${name}`]).then((result) => {
        console.log('result', result);
        console.log('stdout', result.stdout);
        if (result) {
          setStoppedContainers(stoppedContainers.filter((container) => container.Names !== name));
        }
      });

     
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

export const DeleteCommands: React.FC<DeleteCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px'
  };
  return (
    <DeleteButton
      style={cmdbuttonStyle}
      name={name}
      cmdRoute={cmdRoute}
      fetchMethod={fetchMethod}
    />
  );
};
