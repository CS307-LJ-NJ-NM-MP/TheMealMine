import Axios from "axios";
import React from "react";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

const [user, setUser] = useState("");
const [pass, setPass] = useState("");
const [mail, setMail] = useState("");

async function sendMessage(e) {
	e.preventDefault();
	console.log("Sent Request");
	await Axios.post('http://localhost:5000/addUser', {user_id: user, password: pass, email: mail});
}

export const Signup = () => {return (<>
	<TopNav/>
	<div className='login'>
      	<form className="loginForm">
			Email:
			<div>
				<input type="text" onChange={event=>setMail(event.target.value)} value={mail} />
			</div>
			Username:
            	<div>
              		<input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
         		</div>
			Password:
        		<div>
                		<input type="password" /*value={this.state.value} onChange={this.handleChange}*/ />
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
