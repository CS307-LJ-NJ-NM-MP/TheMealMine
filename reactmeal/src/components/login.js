import { Link } from "react-router-dom";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

//need to check how to resize input text box sizes
export const Login = () => {

    function onSubmit() {
        console.log(`Form submitted: `);
    }

    return (
        <>
            <TopNav/>
            <Link to="/signup">Create an Account</Link>
            <div className="login">
                <form className="loginForm">
                    
                        Username:
                        <div>
                            <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                        </div>
                    
                   
                    
                        Password:
                        <div>
                            <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                        </div>
                    
                  
                    <input type="submit" onClick={onSubmit} value="Submit" />
                </form>
                Guest Account
                <SideNav/>
            </div>
        </>
    );
}