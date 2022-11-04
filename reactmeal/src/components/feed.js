import { TopNav } from '../topNav';

import { SideNav } from '../sideNav';
import { CategoryNav } from '../categoryNav';
import { Comments } from '../comments';
import { FeedNav } from '../feedNav';
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'

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