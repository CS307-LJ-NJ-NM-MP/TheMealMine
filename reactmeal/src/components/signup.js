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
			<label>
				<input type="text" /*value={this.state.value} onChange={this.handleChange}*//>
			</label>
			Username:
            	<label>
              		<input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
         		</label>
			Password:
        		<label>
                		<input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
           		</label>
			Re-enter Password:
             	<label>
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
        		</label>
			<label>
				<button type="submit" onClick={onSubmit}>Submit</button>
       		</label>
  		</form>
		<SideNav/>
	</div>
	
</>
);}