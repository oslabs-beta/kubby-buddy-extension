//@ts-ignore
import React, { FC, useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import {
  IconButton,
  Collapse,
  // Container,
  // CardContent,
  Box,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LineChart from '../LineGraph/Line';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { GraphProps } from '../../types';

interface CollapsableProps {
  open: number;
  id: number;
  statStream: GraphProps[];
}

const bull = (
  <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);
export const Collapsable: FC<CollapsableProps> = (props) => {
  // const [open, setOpen] = useState(false)
  const { open, id, statStream } = props;

  return (
    <>
      {/* <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton> */}
      <Collapse
        in={open === id}
        timeout='auto'
        unmountOnExit
        sx={{ display: 'flex', width: '100%'}}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card  sx={{
                minWidth: '275',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'space-between',
                // justifyContent: 'space-between'
              }}>
              <CardContent sx= {{height: '100%'}}>
                <Typography sx={{ fontSize: 14, height: '25%' }} color='text.secondary' gutterBottom>
                  Break it Down
                </Typography>
                <Typography sx={{height: '25%' }} variant='h5' component='div'>
                  Block{bull}IO:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  bytes written and read to the container file system
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} variant='h4'>
                  {statStream[id]?.BlockIO}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card
              sx={{
                minWidth: '275',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'space-between',
                // justifyContent: 'space-between'
              }}
            >
              <CardContent sx= {{height: '100%'}}>
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography variant='h5' component='div' sx={{ height: '25%' }}>
                  PID{bull}s:
                </Typography>
                <Typography sx={{ marginTop: '1em',  height: '25%'  }} color='text.secondary'>
                  windows process ID of the docker daemon{' '}
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%'}} variant='h4'>
                  {statStream[id]?.PIDs}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
          <CardContent sx= {{height: '100%'}}>
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography variant='h5' component='div' sx={{ height: '25%' }}>
                  Mem{bull}Usage:
                </Typography>
                <Typography sx={{ marginTop: '1em',  height: '25%'  }} color='text.secondary'>
amount of memory in use before docker will kill container                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%'}} variant='h4'>
                  {statStream[id]?.PIDs}
                </Typography>
              </CardContent>
          </Grid>
          <Grid item xs={3}>
            <Card>ID: {statStream[id]?.ID}</Card>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};
