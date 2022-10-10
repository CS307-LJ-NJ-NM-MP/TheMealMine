import axios from "axios";
import React from "react";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

function onSubmit() {
	console.log(`Form submitted: `);
}

//need to check how to resize input text box sizes
export const Signup = () => {return (
<>
	<TopNav/>
	<div className='login'>
      	<form className="loginForm">
			Email:
			<div>
				<input type="text" /*value={this.state.value} onChange={this.handleChange}*//>
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
				<button type="submit" onClick={onSubmit}>Submit</button>
       		</div>
  		</form>
		<SideNav/>
	</div>
	
</>
);}