import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
import Pantry from "./pages/PantryPage";

export const Home = () => {
    return (<>
            <div>
                <TopNav/>
                <div className="home-display">
                    <Pantry/>
                    <SideNav/>
                </div>
            </div>
        </>
    );
}
