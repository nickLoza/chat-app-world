import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import bcgUrl from "../assets/images/discord-bcg.webp"


function Login() {

	const { currentUser } = useContext(AuthContext);

  	function handleLogIn(){
	    const provider = new GoogleAuthProvider();
	    signInWithPopup(auth, provider);
    }
    function handleLogOut(){
    	signOut(auth)
    }

	return (
		<div className="login">
			<h1 className="login__title">Join the World Chat Community</h1>
			<p className="login__description">
				where you can belong to a school club, a gaming group, or a worldwide art 
				community. Where just you and a handful of friends can spend time 
				together. 
				A place that makes it easy to talk every day and hang out more often
			</p>
			<img className="login__bcg" src={bcgUrl} alt=""/>
			{currentUser?
			<div className="login__buttons">
			<Link className="login__btn" to="/" role="button">Open chat</Link>
			<button className="login__btn" onClick={handleLogOut}>
				<span className="login__btn-span">Log out</span>
			</button>
			</div>:
			<button className="login__btn" onClick={handleLogIn}>
				<span className="login__btn-span">Log with Google</span>
				<FcGoogle className="login__btn-icon"/>
			</button>}
		</div>
	)
}

export default Login