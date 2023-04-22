import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";
import { StateTypes, actionTypes } from "../modules/types";

export const ChatContext = createContext<any>(null);



export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  
  const INITIAL_STATE:StateTypes = {
    country: "world"
  };


  const chatReducer = (state: StateTypes, action: actionTypes) => {
    switch (action.type) {
      case "CHANGE_COUNTRY-CHAT":
        return {
          country: action.payload
        };

      default:
        return state;
    }
  };


  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};