import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { useState } from "react";
import Axios from "axios";

export const Recovery = () => {

    const [formValue, setFormValue] = useState({
        user: '',
        email: ''
    })
    
    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function sendEmail(e) {
        e.preventDefault();
		localStorage.setItem('username',formValue.user);
		localStorage.setItem('email',formValue.email);
		await Axios.post('http://localhost:5000/recoverPass', {
            user: formValue.user,
            email: formValue.email
        })
		.then(response => {
			console.log(response.data);
			alert("recovery email sent");
		})
		.catch(error => {
			console.log(error.data);
			alert("error");
		});
    }

    return (
            <>
                <div>
                    <form className="loginForm" onSubmit={sendEmail}>
                    	Password Recovery
						<br/>
                            Username:
                            <div>
                                <input type="text" name="user" onChange={handleChange('user')}/>
                            </div>
                            Email:
                            <div>
                                    <input type="text" name="email" onChange={handleChange('email')}/>
                            </div>
                    <div>
                        <button type="submit" onClick={sendEmail}>Submit</button><br/>
                    </div>
                </form>
                </div>
            </>
    );
}
