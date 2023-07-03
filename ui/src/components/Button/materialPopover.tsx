import React, { useState, useContext } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Popover,
  Select,
  TextField
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { UserContext } from '../../UserContext';
import { createDockerDesktopClient } from '@docker/extension-api-client';

import { CommandButtonProps } from '../../types';
const ddClient = createDockerDesktopClient();

//TODO:
//send command to create container with values from continername,port,selectedOption, etc.
//
interface ContainerCreatePopoverProps {
  image: string;
}
export const ContainerCreatePopover: React.FC<ContainerCreatePopoverProps> = ({ image }) => {
  const { availableVolumes } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [containerName, setcontainerName] = useState('');
  const [port, setport] = useState('');
  const [volumeLocation, setvolumeLocation] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [removeChecked, setRemoveChecked] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOption('');
  };

  const handleSubmit = async () => {
    let vol;
    let portNum;

    // check if volume is provided
    if (selectedOption && selectedOption.trim() !== '') {
      // check if fileDirectory is provided
      if (volumeLocation && volumeLocation.trim() !== '') {
        vol = `${selectedOption}:${volumeLocation}`;
      } else {
        vol = `${selectedOption}:/App`;
      }
    } else {
      vol = '';
    }

    // check if port is provided
    if (port && port.trim() !== '') {
      try {
        const inspectCommand = `--format='{{json .Config.ExposedPorts}}' ${image}`;

        const inspectResult = await ddClient.docker.cli.exec('inspect', inspectCommand.split(' '));
        const inspectOutput = JSON.parse(inspectResult.stdout);

        const ports = Object.keys(inspectOutput || {});
        if (ports.length > 0) {
          const [portString] = ports[0].split('/');
          portNum = `${port}:${portString}`;
        }
      } catch (error) {
        console.error('Error inspecting image:', error);
      }
    } else {
      portNum = '';
    }

    try {
      const runCommand = ` -d ${removeChecked ? '--rm' : ''} ${vol ? `-v ${vol}` : ''} ${
        portNum ? `-p ${portNum}` : ''
      } --name ${containerName} ${image}`;
      console.log(runCommand);
      const runResult = await ddClient.docker.cli.exec('run', runCommand.split(' '));
      console.log('stdout:', runResult.stdout);
      // Set status of complete
    } catch (error) {
      console.error('Error running container:', error);
    }

    console.log('Form submitted');
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-form' : undefined;

  const playButtonStyle = {
    color: 'green'
  };
  const popoverStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1em'
  };
  const buttonsContainerStyle = {
    display: 'flex',
    gap: '1em',
    marginRight: '1em',
    margin: '1em',
    alignSelf: 'flex-end'
  };
  return (
    <div>
      <IconButton style={playButtonStyle} onClick={handleClick} className='play-button'>
        <PlayArrowIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        PaperProps={{
          style: popoverStyle
        }}
      >
        <FormControl fullWidth>
          <TextField
            label='Container Name'
            value={containerName}
            onChange={(e) => setcontainerName(e.target.value)}
            margin='normal'
          />
          <TextField
            label='Port'
            value={port}
            onChange={(e) => setport(e.target.value)}
            margin='normal'
          />
          <FormControl fullWidth>
            <Select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value as string)}
              displayEmpty
              margin='dense'
            >
              <MenuItem value='' disabled>
                Optional: initialize with a volume attached
              </MenuItem>
              {availableVolumes.map((volume) => (
                <MenuItem value={volume.Name} key={`volume${volume.Name}`}>
                  {volume.Name}
                </MenuItem>
              ))}
            </Select>
            {selectedOption && (
              <TextField
                label='volume location'
                value={volumeLocation}
                onChange={(e) => setvolumeLocation(e.target.value)}
                margin='normal'
              />
            )}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={removeChecked}
                onChange={(e) => setRemoveChecked(e.target.checked)}
              />
            }
            label='run with remove flag?'
          />
          <div style={buttonsContainerStyle}>
            <Button onClick={handleClose} variant='contained'>
              Close
            </Button>
            <Button onClick={handleSubmit} variant='contained'>
              Submit
            </Button>
          </div>
        </FormControl>
      </Popover>
    </div>
  );
};
