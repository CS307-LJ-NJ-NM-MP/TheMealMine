import { Link } from "react-router-dom";
import { TopNav } from './topNav'
import { SideNav } from './sideNav'

export const Home = () => {
    return (
        <>
            <TopNav/>
            <SideNav/>
            <div>This is the homepage</div>
        </>
    );
}
