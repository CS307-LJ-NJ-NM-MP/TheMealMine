import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
import { Pantry } from './addIngredients'

export const Home = () => {
    return (
        <>
            
            <TopNav/>
            <div className="home-display">
                <SearchNav/>
                <Pantry/>
                <SideNav/>
            </div>
            
        </>
    );
}
