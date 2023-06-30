import React, { FC, useContext, useMemo } from 'react';
import { UserContext } from '../../UserContext';
import { CreateCommands } from '../../components/Button/Create';
import { DeleteImageCommands } from '../Button/DeleteImage';
import { Image } from '../../types';
import Loader from '../Loader/Loader';
import { ListItem, Typography, Box, Button } from '@mui/material';

export const Images: FC = () => {
	const { availableImages } = useContext(UserContext);

	let images;

    console.log(availableImages)
	const StoppedContainer: React.FC<{ el: Image; index: number }> = React.memo(
		({ el, index }) => {
			return (
				<ListItem className="listImage" key={index}>
					<Box className="image-info">
						<Typography className="image-title">{el.Repository}</Typography>
						<Box className="image-subinfo">
							<Typography>Containers: {el.Containers}</Typography>
							<Typography>Time since created: {el.CreatedSince}</Typography>
						</Box>
						<Box className="image-subinfo">
							<Typography>Created At: {el.CreatedAt}</Typography>
							<Typography>Size: {el.Size}</Typography>
						</Box>
						<Box className="image-subinfo">
							<Typography>Tag: {el.Tag}</Typography>
							<Typography>ID: {el.ID}</Typography>
						</Box>
					</Box>
					<Box className="cmdbutton">
						<DeleteImageCommands
							id={el.ID}
							cmdRoute={
								new URL('/image/remove-image-by-name', window.location.href)
							}
							fetchMethod="delete"
						/>
						<CreateCommands
							name={el.Repository}
							cmdRoute={new URL('/image/run-images', window.location.href)}
							fetchMethod="post"
						/>
					</Box>
				</ListItem>
			);
		}
	);

	if (typeof availableImages === 'string') {
		images = <Loader />;
	} else {
		images = useMemo(
			() =>
				availableImages.map((el, index) => (
					<StoppedContainer el={el} index={index} key={`image${index}`} />
				)),
			[availableImages]
		);
	}

	return <div className="imagescontainer">{images}</div>;
};
