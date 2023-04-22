import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import countries from "./utils/countries";

const Chats = () => {

  const { state, dispatch } = useContext(ChatContext);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_COUNTRY-CHAT", payload: u });
  };

  return (
    <aside className="home__aside-chats chats">
        {countries.map((c,i)=>(
          <div key={i} className={`chats__item ${c.name === state.country ? "selected":""}`} onClick={()=>handleSelect(c.name)} aria-label={`open ${c.name} chat`} tabIndex={0}>
            <img className="chats__item-img"src={c.icon} alt={`${c.name} flag`}/>
            <p className="chats__item-title">{c.name}</p>
          </div>
        ))}
    </aside>
  );
};

export default Chats;