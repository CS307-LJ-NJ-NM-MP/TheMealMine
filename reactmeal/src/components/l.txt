import { Link } from "react-router-dom";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
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

	async function sendMessage(e) {
		e.preventDefault();
		console.log("sent");
		var result = await Axios.post('http://localhost:5000/getUser', {
			user: formValue.user,  
			pass: formValue.pass
		});
		console.log(result);
	}

	return (
        	<>
            	<TopNav/>
            	<Link to="/signup">Create an Account</Link>
            	<div className="login">
                		<form className="loginForm">
                    		Username:
                        	<div>
                        		<input type="text" name="user" onChange={handleChange}/>
                        	</div>
                    		Password:
                        	<div>
                            		<input type="text" name="pass" onChange={handleChange}/>
                        	</div>
					<button type="submit" onClick={sendMessage}>Submit</button><br/>
					<Link to="/recovery">Forgot Password</Link>
                		</form>
           		</div>
			<SideNav/>
        	</>
	);
}