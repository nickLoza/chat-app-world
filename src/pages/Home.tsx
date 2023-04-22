import { useContext } from "react";
import Aside from "../components/aside"
import Chat from "../components/chat"
import { ChatContext } from "../context/ChatContext";

function Home() {

	return (
		<main className="home">
			<Aside/>
			<Chat/>
		</main>
	)
}

export default Home