import HomeLogo from "./imgs/homeLogo.png"
import Axios from 'axios';

export const TopNav = () => {
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	var image;
	if((username !== '' || username !== "Guest")&&(password !== '' || password !== "Guest")){
		image = localStorage.getItem('image');
	}else{
		image = 'https://cdn1.vectorstock.com/i/1000x1000/66/35/blue-login-icon-vector-3876635.jpg';
	}
	

	function home(e) {
		e.preventDefault();
		window.location = '/';
	}
	
	async function login(e) {
		e.preventDefault();
		if(username === '' || username === "Guest"){
			window.location = '/login';
		}else{
			localStorage.setItem('username',"Guest");
			localStorage.setItem('password',"Guest");
			localStorage.setItem('image','https://www.clipartmax.com/png/middle/15-153139_big-image-login-icon-with-transparent-background.png');
			window.location = '/login';
			await Axios.post('http://localhost:5000/logoutUser', {
				user: username,
				pass: password
			});
		}
	}
   	return (
      	<>
            <div className="topnav">
				<button onClick={home}><img src={HomeLogo} className="projLogo" alt="logo"/></button>
                <h2><span className="cursive-font">The Meal Mine</span></h2>
				<button onClick={login}><img width="50" height="50" src={image}/></button>
            </div>
        </>
    );
}