import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'

export const Signup = () => {
    return (
        <>
            <TopNav/>
                <form>
                <form className="loginForm">
                `   <label>
                        Email:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <label>
                        Username:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <label>
                        Password:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <label>
                        Re-enter Password:
                        <input type="text" /*value={this.state.value} onChange={this.handleChange}*/ />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </form>
            <SideNav/>
        </>
    );
}