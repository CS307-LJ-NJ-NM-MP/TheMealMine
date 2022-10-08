import { Link } from "react-router-dom";
import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'

export const Home = () => {
    return (
        <>
            
            <TopNav/>
            <div className="home-display">
                <SearchNav/>
                <div>This is the homepage</div>
                <SideNav/>
            </div>
            
        </>
    );
}
