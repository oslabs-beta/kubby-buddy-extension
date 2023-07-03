//@ts-ignore
import React, { FC } from 'react';
import {
  Collapse,

  Box,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
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
  const { open, id, statStream } = props;

  return (
    <>
  
      <Collapse
        in={open === id}
        timeout='auto'
        unmountOnExit
        sx={{
          display: 'flex',
          width: '100%',
          mb: '2em',
          borderBottom: '1px solid #e0e0e0',
          padding: '16px'
        }}
      >
        <Grid container spacing={2} sx = {{marginBottom: '1em'}}>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: '275',
                height: '100%',
                display: 'flex'
                // flexDirection: 'column',
                // paddingBottom: '1em'
                // alignItems: 'space-between',
                // justifyContent: 'space-between'
              }}
            >
              <CardContent
                sx={{
                  minWidth: '275',
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '1em'
                  // alignItems: 'space-between',
                  // justifyContent: 'space-between'
                }}
              >
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography sx={{ height: '25%' }} variant='h5' component='div'>
                  Mem{bull}Percentage:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  percent of memory before docker will kill container{' '}
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: 'black' }}>
                  Diff: <b>{100 - parseFloat(statStream[id]?.MemPerc) + '%'}</b>
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  minWidth: '275',
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '1em',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  sx={{
                    width: '100%',
                    color: '#1976d2',
                    fontSize: '7em',
                    textAlign: 'right',
                    borderBottom: '1px solid #1976d2'
                  }}
                  variant='h1'
                >
                  {statStream[id]?.MemPerc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                minWidth: '275',
                height: '100%',
                display: 'flex'
                // flexDirection: 'column',
                // paddingBottom: '1em'
                // alignItems: 'space-between',
                // justifyContent: 'space-between'
              }}
            >
              <CardContent
                sx={{
                  minWidth: '275',
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '1em'
                  // alignItems: 'space-between',
                  // justifyContent: 'space-between'
                }}
              >
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography sx={{ height: '25%' }} variant='h5' component='div'>
                  CPU{bull}Percentage:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  percentage of the total host capacity is being utilized{' '}
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: 'black' }}>
                  Diff: <b>{100 - parseFloat(statStream[id]?.CPUPerc) + '%'}</b>
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  minWidth: '275',
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '1em',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  sx={{
                    width: '100%',
                    color: '#1976d2',
                    fontSize: '7em',
                    textAlign: 'right',
                    borderBottom: '1px solid #1976d2'
                  }}
                  variant='h1'
                >
                  {statStream[id]?.CPUPerc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card
              sx={{
                minWidth: '275',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: '1em'
    
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography sx={{ height: '25%' }} variant='h5' component='div'>
                  Block{bull}IO:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  bytes written and read from the container to the disk
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: '#1976d2' }} variant='h4'>
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
                paddingBottom: '1em'
          
              }}
            >
              <CardContent sx={{ height: '100%' }}>
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
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  windows process ID of the docker daemon{' '}
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: '#1976d2' }} variant='h4'>
                  {statStream[id]?.PIDs}
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
                paddingBottom: '1em'
        
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography variant='h5' component='div' sx={{ height: '25%' }}>
                  Mem{bull}Actuals:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  amount of memory before docker will kill container
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: '#1976d2' }} variant='h4'>
                  {statStream[id]?.MemUsage}
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
                paddingBottom: '1em'
   
              }}
            >
              <CardContent sx={{ height: '100%' }}>
                <Typography
                  sx={{ fontSize: 14, height: '25%' }}
                  color='text.secondary'
                  gutterBottom
                >
                  Break it Down
                </Typography>
                <Typography variant='h5' component='div' sx={{ height: '25%' }}>
                  Net{bull}IO:
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%' }} color='text.secondary'>
                  bytes written and read by the container over the network
                </Typography>
                <Typography sx={{ marginTop: '1em', height: '25%', color: '#1976d2' }} variant='h4'>
                  {statStream[id]?.NetIO}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};
