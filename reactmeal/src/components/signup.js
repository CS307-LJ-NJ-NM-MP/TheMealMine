import Axios from "axios";
import React from "react";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { useState } from "react";

export const Signup = () => {
	const [formValue, setFormValue] = useState({
		email: '',
		pass: '',
		user: ''
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
		await Axios.post('http://localhost:5000/addUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email
		});
	}

return (<>
	<TopNav/>
	<div className='login'>
      	<form className="loginForm">
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
			Re-enter Password:
             	<div>
                        <input type="password" /*value={this.state.value} onChange={this.handleChange}*/ />
        		</div>
			<div>
				<button type="submit" onClick={sendMessage}>Submit</button>
       		</div>
  		</form>
		<SideNav/>
	</div>
	
</>
);}