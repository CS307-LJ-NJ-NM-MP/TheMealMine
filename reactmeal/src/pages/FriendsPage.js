import React from "react";
import { Box, Container, Text, Stack, Input, Button, HStack, VStack } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";

function FriendsPage() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var friendsList;
    console.log("New Refresh");
    //const [friendsListForm, setFriendsListForm] = useState({
      //  friendsList: '',
    //});
    //const friendsList = JSON.parse(localStorage.getItem(friendsList));
    
    //&& instead of || ?
    
    if((username !== null || username !== "Guest") && (password !== null || password !== "Guest")) {
			var userFriendsList = localStorage.getItem('friendsList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",");
                console.log({friendsList});
			} else {
				friendsList = [];
			}
	} else {
		friendsList = [];
	}
    const FriendDisplay = (name) => {
        return (
        <HStack key={name}>
            <Text>{name}</Text>
            <Button align="right" color="blue">Unfollow</Button>
        </HStack>
        )
    }
    function DisplayAllFriends() {
        return (
            <Box>
                <Text>Hello</Text>
            <li>
            { friendsList.map( (name) => (
                FriendDisplay(name)
            ))}</li>
            </Box>
        );
    }

   
    
    

    

    return(
        <Container maxW='xl' centerContent>
            <TopNav/>
            
            <Box>
                <Stack>
                    <Input name="searchBar" placeholder="Search for user" />
                    <br/>
                    <Text>My Friends</Text>
                    <VStack>
                            <DisplayAllFriends />
                    </VStack>
                </Stack>
                
            </Box>
            <Box>
                <Text>Blocked Users</Text>
            </Box>
            <SideNav />
        </Container>
    ); 
}
export default FriendsPage;