import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'

export const Home = () => {
    return (
        <>
            
            <TopNav/>
            <div className="home-display">
                <SearchNav/>
                <SideNav/>
            </div>
            
        </>
    );
}
