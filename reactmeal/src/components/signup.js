import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

//need to check how to resize input text box sizes
export const Signup = () => {
    return (
        <>
            <TopNav/>
                <form className="loginForm">
                    <label>
                        Email:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <br/>
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
                    <label>
                        Re-enter Password:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>
            <SideNav/>
        </>
    );
}