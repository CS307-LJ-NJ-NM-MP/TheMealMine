import { Link } from "react-router-dom";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

//need to check how to resize input text box sizes
export const Login = () => {
    return (
        <>
            <TopNav/>
            <Link to="/signup">Create an Account</Link>
            <div className="login">
                <form className="loginForm">
                    
                        Username:
                        <form>
                            <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                        </form>
                    
                   
                    
                        Password:
                        <form>
                            <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                        </form>
                    
                  
                    <input type="submit" value="Submit" />
                </form>
                Guest Account
                <SideNav/>
            </div>
        </>
    );
}