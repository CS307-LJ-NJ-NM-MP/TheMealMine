import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { useState } from "react";
import Axios from "axios";

export const Recovery = () => {
	const [formValue, setFormValue] = useState({
		user: '',
		email: ''
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
		await Axios.post('http://localhost:5000/recoverPass', {
			user: formValue.user,
			email: formValue.email
		});
	}

	return (
        	<>
            	<TopNav/>
            	<div>
                		<form className="loginForm">
					Password Recovery<br/>
                    		Username:
                        	<div>
                        		<input type="text" name="user" onChange={handleChange}/>
                        	</div>
                    		Email:
                        	<div>
                            		<input type="text" name="email" onChange={handleChange}/>
                        	</div>
					<div>
						<button type="submit" onClick={sendMessage}>Submit</button><br/>
                			</div>
				</form>
           		</div>
			<SideNav/>
        	</>
	);
}