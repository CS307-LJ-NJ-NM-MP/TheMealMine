import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
import { Pantry } from './addIngredients'
import background from "./imgs/homeLogoCopy.png"

export const Home = () => {
    return (
        <>
            <div style={{ backgroundImage: `url(${background})` }}>
                <TopNav/>
                <div className="home-display">
                    <SearchNav/>
                    <Pantry/>
                    <SideNav/>
                </div>
            </div>
            
        </>
    );
}
