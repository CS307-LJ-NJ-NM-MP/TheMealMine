import { TopNav } from '../topNav'
import { SideNav } from '../sideNav'
import { FriendNav } from '../friendNav'

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
                Search for users here:<br/>
            <FriendNav/><br/>

            </div>
        </>
    );
}