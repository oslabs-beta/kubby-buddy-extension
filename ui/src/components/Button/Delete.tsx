// /prune-stopped-containers

import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { CommandButtonProps } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteButton: React.FC<DeleteCommandProp> = ({ name, cmdRoute, fetchMethod }) => {
  //helper
  const { setStoppedContainers, stoppedContainers } = useContext(UserContext);

  const command = async () => {
    try {
      const URL = cmdRoute;
      const response = await fetch(URL, {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      });
      const data = await response.json();
      console.log('test---->:' + data);
      if (response.status !== 500) {
        setStoppedContainers(stoppedContainers.filter((container) => container.Names !== name));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const deleteButtonStyle = {
    color: 'red',
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
    gap: '8px',
  };
  return <DeleteButton style ={cmdbuttonStyle}  name={name} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />;
};
