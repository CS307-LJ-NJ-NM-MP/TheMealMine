import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import Axios from "axios";
import { useState } from "react";

export const Settings = () => {
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

	async function updateSettings(e) {
		e.preventDefault();
		var result = await Axios.post('http://localhost:5000/updateUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email
		});
		console.log(result);
	}

    return (
        <>
            <TopNav/>
            <div>
                Settings:<br/>
                <div>
                    Username:
                    <input type="text" name="user" onChange={handleChange}/>
                </div>
                <div>
                    Email:
                    <input type="text" name="email" onChange={handleChange}/>
                </div>
                <div>
                    Password:
                    <input type="text" name="pass" onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit" onClick={updateSettings}>Apply Changes</button>
                </div>
            </div>
            <SideNav/>
        </>
    );
}
