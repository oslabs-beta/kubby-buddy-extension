// contain our containers

import React, { FC, useContext } from 'react';
import { DockerContainers } from '../Container/DockerContainer';
import { Images } from '../Images/Images';
import { UserContext } from '../../UserContext';
import { Box, Typography } from '@mui/material';

// import Loader from '../Loader/Loader';
//using a ternary based on booleans from useContext to switch the views

export const MainNav: FC = () => {
	const { showing } = useContext(UserContext);

	return (
		<Box className="main-nav">
			<Typography component="ul">
                {/* {showing === 'Containers' ? <DockerContainers /> : <Images />} */}
                Image Component
                <Images />
			</Typography>
		</Box>
	);
};
