import Axios from "axios";
import { useState } from "react";
import React from "react";
//import { Link } from "react-router-dom";
//import { TopNav } from '../topNav'
//import { SideNav } from '../sideNav'


export const Pantry = () => {
    const [name, setName] = useState("");

    const FriendsList = [
    ];

    const [list, setList] = useState(FriendsList);

    function sendRequest() {
        handleAdd();
        alert("Ingredient Added: " + name);
        setName("");
    }

    function handleAdd() {
        const newList = list.concat({name});

        setList(newList)
    }

    const handleSubmit = event => {
        event.preventDefault();
//        setName('');
    }
    /*
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
		var result = await Axios.post('http://localhost:5000/signupUser', {
			user: formValue.user,  
			pass: formValue.pass,
			email: formValue.email
		});
		console.log(result);
	}*/

return (<>
	
	<div className='login'>
      	<form className="loginForm">
			{' '}
			<span className="montserrat-font">
				Add To Pantry
			</span>
			<br/>
			Ingredient Name:
			<div>
				<input type="text" name="email" onChange={event => setName(event.target.value)} value={name} />
			</div>
			Amount:
            	<div>
              		<input type="text" name="user" />
         		</div>
			<div>
				<button type="submit" onClick={sendRequest}>Submit</button>
       		</div>
  		</form>
	</div>
</>
);}