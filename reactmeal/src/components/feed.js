import { TopNav } from '../topNav';
import { SideNav } from '../sideNav';
import { CategoryNav } from '../categoryNav';
import { Comments } from '../comments';
import { FeedNav } from '../feedNav';
import React, { useState } from "react";
import Axios from "axios";




export const Feed = () => {
    return (
        <>
            <TopNav/>

            <FeedNav/>
            
            <SideNav/>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <br />

            <br />
            <CategoryNav/>
            </div>
            <Comments/>
            
        </>
    );
}