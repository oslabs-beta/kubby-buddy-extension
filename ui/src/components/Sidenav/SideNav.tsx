// display system wide command menu
// contains Quickview component
/*

*/
import React, { FC, useContext, useEffect } from 'react';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
import favicon from '../../../public/favicon.png';
import { Container } from '../../types';
import { createDockerDesktopClient } from '@docker/extension-api-client';
const ddClient = createDockerDesktopClient();

export const SideNav: FC = () => {
  // const testimage = require('../../assests/test.png')
  const {
    setStoppedContainers,
    setRunningContainers,
    setAvailableImages,
    setShowing,
    setAvailableVolumes,
  } = useContext(UserContext);

  useEffect(() => {
    // INITIAL LOAD
    async function getRunningContainers() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('ps', ['--all', '--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));

        //     await promisifyExec(
        // 	"docker ps -a --format '{{json .}}'"
        // );
        // const getURL = 'container/all-active-containers';
        // const fetchResponse = await fetch(getURL);
        // const data: Container[] = await fetchResponse.json();

        console.log(data);

        setRunningContainers(
          data?.filter((container: any) => container.State !== 'exited')
        );
        setStoppedContainers(
          data?.filter((container: any) => container.State === 'exited')
        );
      } catch (error) {
        console.log(error);
      }
    }
    async function getAvailableImages() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('images', ['--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));
        // const getURL = 'image/all-images';
        // const fetchResponse = await fetch(getURL);
        // const data = await fetchResponse.json();
        console.log(data);
        setAvailableImages(data);
      } catch (error) {
        setAvailableImages([]);

        console.log(error);
        console.log('hi');
      }
    }
    async function getAvailableVolumes() {
      try {
        let data: any;
        await ddClient.docker.cli
          .exec('volume', ['ls', '--format', '"{{json .}}"'])
          .then((result) => (data = result.parseJsonLines()));
        // const getURL = 'volume/all-volumes';
        // const fetchResponse = await fetch(getURL);
        // const data = await fetchResponse.json();

        setAvailableVolumes(data);
      } catch (error) {
        console.log(error);
      }
    }
    getAvailableVolumes();
    getRunningContainers();
    getAvailableImages();
  }, []);

  return (
    <div className="side-nav">
      <div className="favicon-holder">
        <img className="favicon" src={favicon} />
      </div>
      <ul>
        <li>Dashboard</li>
        <li onClick={() => setShowing('Images')}>Images</li>
        <li onClick={() => setShowing('Containers')}>Containers</li>
      </ul>
      {/* <GlobalCommands /> */}
      {/* <Quickview /> */}
    </div>
  );
};
