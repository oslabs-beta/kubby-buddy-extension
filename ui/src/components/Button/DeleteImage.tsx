// /prune-stopped-containers

import React, { useContext } from 'react';
import trash from '../../../public/favicon.png';
import { UserContext } from '../../UserContext';
import { CommandButtonProps } from '../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient();

interface DeleteCommandProp extends CommandButtonProps {}

const DeleteImageButton: React.FC<DeleteCommandProp> = ({ id, cmdRoute, fetchMethod }) => {
  //helper
  const { setAvailableImages, availableImages } = useContext(UserContext);

  const command = async () => {
    console.log(id)
    try {
      let data;
      const response = ddClient.docker.cli.exec('image', ['rmi', `${id}`]).then((result) => {
        console.log(result);
        data = result;
        if (result) {
          setAvailableImages(availableImages.filter((image) => image.ID !== id));
          }
      });
      // const URL = cmdRoute;
      // const response = await fetch(URL, {
      //   method: fetchMethod,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ id: id }),
      // });
      // const data = await response.json();
      console.log('test---->:' + data);
      // if (data) {
      // setAvailableImages(availableImages.filter((image) => image.ID !== id));
      // }
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

export const DeleteImageCommands: React.FC<DeleteCommandProp> = ({ id, cmdRoute, fetchMethod }) => {

  const cmdbuttonStyle: React.CSSProperties = {
    display: 'flex',
    gap: '8px'
  };

  return <DeleteImageButton id={id} cmdRoute={cmdRoute} fetchMethod={fetchMethod} />;
};
