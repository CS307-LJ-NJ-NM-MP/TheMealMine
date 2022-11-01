import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { SearchNav } from '../searchNav';
import { FriendNav } from '../friendNav';
import { ReactDOM } from 'react-dom/client';

export const Friends = () => {

    return (
        
        <>
            <div>
            <TopNav/>

            Friends List:
            <SideNav/>
            <FriendNav/>
            </div>
        </>
    );
}