import Chats from "./Chats"
import  {AiOutlineGithub } from "react-icons/ai"
function Aside() {
	return (
		<aside className="home__aside">
			<Chats/>
			<a 
			className="home__aside-repo"
			href="https://github.com/nickLoza/chat-app-world" 
			target="_blank">
				<AiOutlineGithub/> <span>Github</span>
			</a>
		</aside>
	)
}

export default Aside