import Axios from "axios";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { TopNav } from '../topNav'

export const Signup = () => {
	const [formValue, setFormValue] = useState({
		email: '',
		pass: '',
		user: '',
		image: ''
	})
	
	const handleChange = (e) => {
		let value = e.target.value;
		let name = e.target.name;
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: value
			}
		}); 
	}

	async function addUser(e) {
		e.preventDefault();
		window.location = '/login';
		await Axios.post('http://localhost:5000/signupUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email,
			image: formValue.image
		});
	}
	
return (<>
	<TopNav/>
	<div className='login'>
      	<form className="loginForm">
			Sign-Up<br/>
			Email:
			<div>
				<input type="text" name="email" onChange={handleChange}/>
			</div>
			Username:
            	<div>
              		<input type="text" name="user" onChange={handleChange}/>
         		</div>
			Password:
        		<div>
                		<input type="password" name="pass" onChange={handleChange}/>
           		</div>
			Image: 
				<div>
					<input type="text" placeholder="img url" name="image" onChange={handleChange}/>
				</div>
			<div>
				<button type="submit" onClick={addUser}>Submit</button>
       		</div>
			<Link to="/recovery">Forgot Password</Link><br/>
			<Link to="/">Continue as Guest</Link>
  		</form>
	</div>
</>
);}
