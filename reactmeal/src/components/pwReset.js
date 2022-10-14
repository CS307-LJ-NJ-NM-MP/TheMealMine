import { useState } from "react"
import Axios from "axios"


export const PWReset = () => {
    const [formValue, setFormValue] = useState({
        pass: ''
    })
    

    /*
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
    */

    
    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }
    

    async function updatePass(e) {
        e.preventDefault();
		var result = await Axios.post('http://localhost:5000/updatePass', {
            user: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            pass: formValue.pass
        });
        window.location = '/login';
    }
    return (
        <>
            <div>
                <form className="password reset form" onSubmit={updatePass}>
                    Password Recovery
                    <br/>
                        New Password:
                        <div>
                            <input type="text" name="pass" onChange={handleChange('pass')}/>
                        </div>
                <div>
                    <button type="submit" onClick={updatePass}>Submit</button><br/>
                </div>
            </form>
            </div>
        </>
);
}