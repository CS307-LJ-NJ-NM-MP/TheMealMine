import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
//import { Pantry } from './addIngredients'
import Pantry from "./addIngredients";

export const Home = () => {
    return (
        <>
            <div>
                <TopNav/>
                <div className="home-display">
                    <SearchNav/>
                    <Pantry />
                    <SideNav/>
                </div>
            </div>
        </>
    );
}
