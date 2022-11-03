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
            <SideNav/>
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Search for users here:
                <br />
            <FriendNav/>
            <br />

            </div>
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Search for users here:
                <br />
            <FriendNav/>
            <br />

            </div>
        </>
    );
}