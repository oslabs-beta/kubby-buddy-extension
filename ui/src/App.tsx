import React, { FC } from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";
import Loader from "./components/Loader/Loader";
import { UserProvider } from "./UserContext";
import { SideNav } from "./components/Sidenav/SideNav";
import { MainNav } from "./components/Mainnav/MainNav";

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
	return client;
}

export function App() {
	const [response, setResponse] = React.useState<string>();
	const ddClient = useDockerDesktopClient();

	const fetchAndDisplayResponse = async () => {
		const result = await ddClient.extension.vm?.service?.get("/hello");
		setResponse(JSON.stringify(result));
	};

	return (
		<UserProvider>
			<>
				<div className="mainpage">
					{/* <img src={logo} /> */}
					{/* <h1>howdy kubby buddies! YOOO</h1> */}
					<SideNav />
					<MainNav />
				</div>
				
				{/* <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
					<Button variant="contained" onClick={fetchAndDisplayResponse}>
						Call backend
          </Button>
          

					<TextField
						label="Backend response"
						sx={{ width: 480 }}
						disabled
						multiline
						variant="outlined"
						minRows={5}
						value={response ?? ""}
					/>
				</Stack> */}
			</>
		</UserProvider>
	);
}
