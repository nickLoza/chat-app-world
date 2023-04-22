import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../config/firebase";
import { collection, orderBy, query, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineSend } from "react-icons/ai";


function Chat() {

	const scroll = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const { currentUser } = useContext(AuthContext);
	const { state } = useContext(ChatContext);
	const { country } = state;

	const [ allMessages, setAllMessages ] = useState<Array<any>>([])

	useEffect(() => {
  		if(scroll.current){
      		scroll.current.scrollIntoView({ behavior: 'smooth',block: "end", inline: "nearest"  });
      	}
	    const q = query(collection(db, 'messages'), orderBy('createdAt'));
	    const unsubscribe = onSnapshot(q, (querySnapshot) => {
	      let messages:Array<any> = [];
	      querySnapshot.forEach((doc) => {
	        messages.push({ ...doc.data(), id: doc.id });
	      });
	      setAllMessages(messages);
	    });
	    return () => unsubscribe();
  	}, []);

	const messagesRef = collection(db,'messages');

	const handleOnSubmit = () => {
    	if(inputRef.current){
    		const trimmedMessage = inputRef.current.value;
	    if (trimmedMessage!="") {
	      // Add new message in Firestore
	      addDoc(messagesRef,{
	        text: trimmedMessage,
	        createdAt: serverTimestamp(),
	        userName: currentUser.displayName,
	        country,
	        userId: currentUser.uid
	      });
	      // Clear input field
	      inputRef.current.value = '';
	      // Scroll down to the bottom of the list
	      setTimeout(()=>{
	      	if(scroll.current){
	      		scroll.current.scrollIntoView({ behavior: 'smooth',block: "end", inline: "nearest"  });
	      	}
	      },200)
  	}
    	}
    }
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
    	if(inputRef.current){
    		inputRef.current.value = e.target.value;
    	}
    }
    function handleOnKey(e: React.KeyboardEvent){
    	if(e.key === "Enter"){
    		handleOnSubmit()
    	}
    }

	return (
		<div className="home__chat">
			<ul className="home__chat-messages messages" tabIndex={0} aria-label={`messages on ${country} chat`}>
				{allMessages.filter(msg=>msg.country === country)?.map((msg)=>(
				// if user id is equal to current id the message is shown with a "flex-direction: row-reverse"
				<li key={msg.id} className={`messages__msg ${msg.userId === currentUser.uid? "user-right":""}`} aria-label={`${msg.userName} said ${msg.text}`} tabIndex={0}>
					<img 
						className="messages__msg-img" 
						src={`https://robohash.org/${msg.userId}`} 
						alt={`${msg.userName} profile picture`}/>
					<div className="messages__msg-text text">
						<b className="text__name">{msg.userName}</b>
						<p className="text__msg">{msg.text}</p>
					</div>
				</li>
			))}
			<div ref={scroll}></div>
			</ul>
			<div className="home__chat-send send">
				<input 
					ref={inputRef}
					className="send__input" 
					type="text" 
					onChange={handleOnChange}
					onKeyUp={handleOnKey}
					placeholder={`Type a message as ${currentUser.displayName}`}/>
				<button 
					className="send__submit" 
					onClick={handleOnSubmit}
					aria-label="send message">
					<AiOutlineSend/>
				</button>
			</div>
		</div>
	)
}

export default Chat