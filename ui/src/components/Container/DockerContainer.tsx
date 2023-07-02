import React, { FC, useContext, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import { DisplayRunning } from './ContainerDisplay';
import { StoppedContainers } from './StoppedContainers';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Container } from '../../types';
import { parse } from 'path';
const ddClient = createDockerDesktopClient();

const parseData = (stdout: string) => {
  const containers = [];
  const dockerStats: string = stdout.trim();
  const conts: string[] = dockerStats.split('\n');

  for (let i = 0; i < conts.length; i++) {
    containers.push(JSON.parse(conts[i]));
  }
  //returns array of proper objects to then be stringified
  return containers;
};

export const DockerContainers: FC = () => {
  const { setStoppedContainers, setRunningContainers, setStatStream } = useContext(UserContext);

  useEffect(() => {
    async function getRunningContainers() {
      try {
        const url = 'container/all-active-containers';
        const response = await fetch(url);
        const data: Container[] = await response.json();
        setRunningContainers(
          data.filter((container) => container.State !== 'exited')
        );
        setStoppedContainers(
          data.filter((container) => container.State === 'exited')
        );
      } catch (err) {
        console.error(err);
      }
    }
    getRunningContainers();
  }, []);

  //Create EvenSource to stream docker stats


  // useEffect(
  //   () => {
  //     // ** Change localhost to env later on **
  //     const response = ddClient.docker.cli
  //       .exec('stats', ['--no-stream', '--format', '-json'])
  //       .then((result: any) => {
    
  //         if (typeof result === 'object') {
  //           setStatStream(result);
  //           console.log(result)
  //         }
          
  //       });
  //   },
  //   // If there is an error for the stream (Docker not running / No active containers) - setup for Error Component

  //   // if this is uncommented, the stream stops

  //   []
  // );

  //pass down necessary props to buttons for their relevant fetch requests
  return (
    <>
      <DisplayRunning />
      <StoppedContainers />
    </>
  );
};
