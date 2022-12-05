import { TopNav } from '../topNav'
import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel} from '@chakra-ui/react'
import React from "react";
import { SideNav } from "../sideNav";
import { useState } from "react";
import Axios from "axios";

import notificationsBackground from '../imgs/notificationsBackground.jpeg'



export const Notifications = () => {
    var username = localStorage.getItem('username');
    async function getNotis() {
        var result = await Axios.post('http://localhost:5000/findUser', {
				user: username
		});
        localStorage.setItem('notifications', result.data.notifications);
    }

    getNotis();
    
    const [doRender, setDoRender] = useState("no");
    var notifications = [];
    var notis = localStorage.getItem('notifications');
    if(notis!=undefined){
        notifications = notis.split(",");
    }else{
        notifications = [""]
    }
    async function seen (e) {
        var result = await Axios.post('http://localhost:5000/removeNotif', {
				user: username,
                message: e.target.value
		});
        getNotis();
    
    //const [doRender, setDoRender] = useState("no");
    var notifications = [];
    var notis = localStorage.getItem('notifications');
    if(notis!=undefined){
        notifications = notis.split(",");
    }else{
        notifications = [""]
    }
    }
    
    return (
    
    <>
        <Container borderColor="transparent" maxW='100%' h='calc(100vh)' 
                backgroundRepeat="no-repeat" bgSize="100%" backgroundImage={notificationsBackground} align="center">
            <TopNav/>
            <Center>
            <Box m="2%" w="40%" bg="white"
                borderRadius="lg" padding="10px">
            <Center>
                <FormLabel>Notifications</FormLabel>
            </Center>
            <br/>
            <Center>
                <div>
                    {notifications.map((message, index) => (
                        <p key={message}>{message}  <Button value={message} onClick={seen} >Remove</Button></p>
                    ))}
                </div>
            </Center>
            </Box>
            </Center>
        </Container>
    </>);
}