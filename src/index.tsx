import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<AuthContextProvider>
		<ChatContextProvider>
			<React.StrictMode>
				<App/>
			</React.StrictMode>
		</ChatContextProvider>
	</AuthContextProvider>)
