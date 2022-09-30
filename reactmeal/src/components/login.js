import { Link } from "react-router-dom";
import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'


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
                    <label>
                        Password:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <Link to="/signup">Create an Account</Link>
                <SideNav/>
            </div>
        </>
    );
}