// display system wide command menu
// contains Quickview component
/*

*/
import React, { FC, useContext, useEffect } from 'react';
import { GlobalCommands } from '../GlobalCommands/GlobalCommands';
import { UserContext } from '../../UserContext';
import favicon from '../../../public/favicon.png';
import { Container } from '../../types';
import { exec } from 'node:child_process';
import { promisify } from 'util';
const promisifyExec = promisify(exec);

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
				const { stdout, stderr } = await promisifyExec(
					"docker ps -a --format '{{json .}}'"
				);
				// const getURL = 'container/all-active-containers';
				// const fetchResponse = await fetch(getURL);
				// const data: Container[] = await fetchResponse.json();
                const data = stdout
                .trim()
                .split('\n')
                .map((item) => JSON.parse(item, undefined));

				setRunningContainers(
					data.filter((container) => container.State !== 'exited')
				);
				setStoppedContainers(
					data.filter((container) => container.State === 'exited')
				);
			} catch (error) {
				console.log(error);
			}
		}
		async function getAvailableImages() {
			try {
				const getURL = 'image/all-images';
				const fetchResponse = await fetch(getURL);
				const data = await fetchResponse.json();
				console.log(data);
				setAvailableImages(data);
			} catch (error) {
				setAvailableImages([]);
				console.log(error);
			}
		}
		async function getAvailableVolumes() {
			try {
				const getURL = 'volume/all-volumes';
				const fetchResponse = await fetch(getURL);
				const data = await fetchResponse.json();

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
			<GlobalCommands />
			{/* <Quickview /> */}
		</div>
	);
};
