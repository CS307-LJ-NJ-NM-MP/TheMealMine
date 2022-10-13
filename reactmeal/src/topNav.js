import HomeLogo from "./imgs/homeLogo.png"

export const TopNav = () => {
	var username = localStorage.getItem('username');
	var password = localStorage.getItem('password');
	var loginLabel;
	if((username !== "Guest" || username !== "")&&(password !== "Guest" || password !== "")){
		loginLabel = "Log-Out";
	}else{
		loginLabel = "Log-In";
	}
	function home(e) {
		e.preventDefault();
		window.location = '/';
	}
	function loginOut(e) {
		e.preventDefault();
		if(loginLabel === "Log-Out"){
			window.location = '/logout';
		}else{window.location = '/login';}
	}
   	return (
      	<>
            	<div className="topnav">
					<button onClick={home}><img src={HomeLogo} className="projLogo" alt="logo"/></button>
                	<h2><span className="cursive-font">The Meal Mine</span></h2>
                	<button onClick={loginOut}>{loginLabel}</button>
            	</div>

        	</>
    	);
}