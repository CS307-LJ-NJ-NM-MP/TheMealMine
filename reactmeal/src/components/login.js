import { Link } from "react-router-dom";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

//need to check how to resize input text box sizes
export const Login = () => {
    return (
        <>
            <TopNav/>
            <div className="login">
                <form className="loginForm">
                    <label>
                        Username:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
                <Link to="/signup">Create an Account</Link>
                <SideNav/>
            </div>
        </>
    );
}