import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import Axios from "axios";
import { useState } from "react";

export const Settings = () => {    
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    const [formValue, setFormValue] = useState({
		email: '',
		pass: '',
		user: '',
        privacy1: '',
        privacy2: '',
        privacy3: '',
        remember: ''
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
    async function updateUsername(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			user: formValue.user,
            pass: formValue.pass,
            email: formValue.email,
            setting: 0
		});
	}
	async function updateEmail(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			email: formValue.email,
            user: formValue.user,
            pass: formValue.pass,
            setting: 1
		});
	}
    async function updatePassword(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			pass: formValue.pass,
            user: formValue.user,
            email: formValue.email,
            setting: 2
		});
	}
    async function updatePrivacy1(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
            user: formValue.user,
            email: formValue.email,
            pass: formValue.pass,
			privacy: "Private",
            setting: 3
		});
	}
    async function updatePrivacy2(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			user: formValue.user,
            email: formValue.email,
            pass: formValue.pass,
            privacy: "Private to Friends",
            setting: 3
		});
	}
    async function updatePrivacy3(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			user: formValue.user,
            email: formValue.email,
            pass: formValue.pass,
            privacy: "Public",
            setting: 3
		});
	}
    async function remember(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			user: formValue.user,
            email: formValue.email,
            pass: formValue.pass,
            remember: "Remember",
            setting: 4
		});
	}
    async function forget(e) {
		e.preventDefault();
		await Axios.post('http://localhost:5000/updateSettings', {
			user: formValue.user,
            email: formValue.email,
            pass: formValue.pass,
            remember: "Forget",
            setting: 4
		});
	}
    return (
        <>
            <TopNav/>
            <div>
                Settings:<br/>
                <div>
                    Username:
                    <input type="text" name="user" placeholder={username} onChange={handleChange}/>
                    <button type="submit" onClick={updateUsername}>Apply Username</button>
                </div>
                <div>
                    Email:
                    <input type="text" placeholder='Fill in' name="email" onChange={handleChange}/>
                    <button type="submit" onClick={updateEmail}>Apply Email</button>
                </div>
                <div>
                    Password:
                    <input type="password" placeholder={password} name="pass" onChange={handleChange}/>
                    <button type="submit" onClick={updatePassword}>Apply Password</button>
                </div>
                <div>
                    <button type="submit" onClick={updatePrivacy1}>Make Private</button>
                </div>
                <div>
                    <button type="submit" onClick={updatePrivacy2}>Make Private to Friends</button>
                </div>
                <div>
                    <button type="submit" onClick={updatePrivacy3}>Make Public</button>
                </div>
                <div>
                    <button type="submit" onClick={remember}>Remember Me</button>
                    <button type="submit" onClick={forget}>Forget Me</button>
                </div>
            </div>
            <SideNav/>
        </>
    );
}
