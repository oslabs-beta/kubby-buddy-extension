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

//TODO:
//send command to create container with values from continername,port,selectedOption, etc.
//

export const ContainerCreatePopover = () => {
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
  };

  const handleSubmit = () => {
    // You can access the form values from state variables (containerName, port, volumeLocation, selectedOption, removeChecked)
    // function that will run exec to run container from image
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
    gap: '0.5em',
    alignItems: 'flex-end'
  };
  const buttonsContainerStyle = {
    display: 'flex',
    gap: '0.5em'
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
        style={popoverStyle}
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
