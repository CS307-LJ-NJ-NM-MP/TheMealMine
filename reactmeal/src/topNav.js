import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';

export const TopNav = () => {
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	
	function home(e) {
		e.preventDefault();
		window.location = '/';
	}
	function login(e) {
		e.preventDefault();
		window.location = '/login';
	}
	async function logOut(e) {
		e.preventDefault();
		localStorage.setItem('username',"Guest");
		localStorage.setItem('password',"Guest");
		window.location = '/login';
		await Axios.post('http://localhost:5000/logoutUser', {
			user: username,
			pass: password
		});
	}
   	return (
      	<>
            <div className="topnav">
				<button onClick={home}><img src={HomeLogo} className="projLogo" alt="logo"/></button>
                <h2><span className="cursive-font">The Meal Mine</span></h2>
                <button onClick={login}>Log-In</button>
				<button onClick={logOut}>Log-Out</button>
            </div>
        </>
    );
}