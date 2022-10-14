import { TopNav } from '../topNav'
import { useState } from "react";
import Axios from "axios";

export const Login = () => {
	const [formValue, setFormValue] = useState({
		user: '',
		pass: ''
	})
	
	const handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

	async function login(e) {
		e.preventDefault();
		if(formValue.user !== '' && formValue.pass !== '') {
			localStorage.setItem('username',formValue.user);
			localStorage.setItem('password',formValue.pass);
			var result = await Axios.post('http://localhost:5000/loginUser', {
				user: formValue.user,  
				pass: formValue.pass
			});
			localStorage.setItem('email',result.data.email);
			localStorage.setItem('image',result.data.image);
			localStorage.setItem('pantry',result.data.pantry);
			window.location = "/";
		}
	}
	
	function recovery(e) {
		e.preventDefault();
		window.location = '/recovery';
	}
	function signup(e) {
		e.preventDefault();
		window.location = '/signup';
	}
	function guest(e) {
		e.preventDefault();
		localStorage.setItem('username',"Guest");
		localStorage.setItem('password',"Guest");
		window.location = "/";
	}
	return (
        	<>
            	<TopNav/>
            	<div className="login">
                		<form className="loginForm">
							Login<br/>
                    		Username:
                        	<div><input size="15" type="text" name="user" onChange={handleChange}/></div>
                    		Password:
                        	<div><input size="15"type="password" name="pass" onChange={handleChange}/></div>
							<div><button type="submit" onClick={login}>Login</button></div>
							<div><button type="submit" onClick={recovery}>Forgot Password</button></div>
							<div><button type="submit" onClick={signup}>Create An Account</button></div>
							<div><button type="submit" onClick={guest}>Continue As Guest</button></div>
                		</form>
           		</div>
        	</>
	);
}
