import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { SearchNav } from '../searchNav'
import { Recovery } from './recovery'



export const Feed = () => {
    return (
        <>
            <TopNav/>
            <Recovery/>
            <div>This is the feed homepage</div>
            <SideNav/>
            
        </>
    );
}