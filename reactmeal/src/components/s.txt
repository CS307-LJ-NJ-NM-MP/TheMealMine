import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

//need to check how to resize input text box sizes
export const Signup = () => {return (
<>
	<TopNav/>
      	<form className="loginForm">
			Email:
			<form>
				<input type="text" /*value={this.state.value} onChange={this.handleChange}*//>
			</form>
			Username:
            	<form>
              		<input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
         		</form>
			Password:
        		<form>
                		<input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
           		</form>
			Re-enter Password:
             	<form>
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
        		</form>
			<form action="../../post" method="post">
				<button type="submit">Submit</button>
       		</form>
  		</form>
	<SideNav/>
</>
);}