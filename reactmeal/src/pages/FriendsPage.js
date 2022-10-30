import React from "react";
import { Box, Container, Text, Stack, Input, Button } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";

function FriendsPage() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var friendsList;
    //const friendsList = JSON.parse(localStorage.getItem(friendsList));
    
    //&& instead of || ?
    
    if((username !== null || username !== "Guest") && (password !== null || password !== "Guest")) {
			var userFriendsList = localStorage.getItem('friendsList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",,");
                console.log({friendsList});
			} else {
				friendsList = [];
			}
	} else {
		friendsList = [];
	}
    function showUsersFriends(array) {
        return array.map(friend => <li><Text>{friend}</Text></li>);
    }

    

    return(
        <Container maxW='xl' centerContent>
            <TopNav/>
            
            <Box>
                <Stack>
                    <Input name="searchBar" placeholder="Search for user" />
                    <Box>
                    <ul>
                        {friendsList.map((friend =>
                        <li key={friend.user}>{friend.user}</li>))}

                    </ul>
                    
                    </Box>
                </Stack>
                
            </Box>
            <Box>
                <Text>My Friends</Text>
            </Box>
            <Box>
                <Text>Blocked Users</Text>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default FriendsPage;