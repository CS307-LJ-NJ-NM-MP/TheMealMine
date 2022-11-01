import React from "react";
import { Box, Container, Text, Stack, Input, Button, HStack, VStack } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";

function FriendsPage() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var friendsList;
    var blockedList;
    console.log("New Refresh");
    //const [friendsListForm, setFriendsListForm] = useState({
      //  friendsList: '',
    //});
    //const friendsList = JSON.parse(localStorage.getItem(friendsList));
    
    //&& instead of || ?
    if((username !== null && username !== "Guest") && (password !== null && password !== "Guest")) {
			var userFriendsList = localStorage.getItem('friendsList');
            var usersBlockedList = localStorage.getItem('blockedList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",");
                console.log({friendsList});
			} else {
				friendsList = [];
			}
            if (usersBlockedList !== null) {
                blockedList = usersBlockedList.split(",");
                console.log({blockedList});
            } else {
                blockedList = [];
            }
	} else {
		friendsList = [];
        blockedList = [];
	}
    const handleUnfollow = (name) => {
        //Send request to server to update mongo and remove that person from their friendslist
    }

    const FriendDisplay = (name) => {
        return (
        <HStack key={name} width="400px" spacing="10px" border-style="solid">
            <Text width="200px">{name}</Text>
            <Button align="right" color="blue">Unfollow</Button>
        </HStack>
        );
    }
    function DisplayAllFriends() {
        return (
            <Box>
            <ul>
            { friendsList.map( (name) => (
                FriendDisplay(name)
            ))}</ul>
            </Box>
        );
    }
 const BlockedDisplay = (name) => {
        return (
        <HStack key={name} width="400px" spacing="10px" border-style="solid">
            <Text width="200px">{name}</Text>
            <Button align="right" color="blue">Unblock</Button>
        </HStack>
        )
    }
    function DisplayAllBlocked() {
        return (
            <Box>
            <ul>
            {   
                blockedList.map( (name) => (
                BlockedDisplay(name)
            ))}</ul>
            </Box>
        );
    }
   
    
    

    

    return(
        <Container maxW='xl' centerContent>
            <TopNav/>
            
            <Container>
                <Stack>
                    <Input name="searchBar" placeholder="Search for user" />
                    
                    <Text fontWeight="bold"> My Friends</Text>
                    <VStack>
                            <DisplayAllFriends />
                    </VStack>
                    <br/>
                    <VStack>
                            <Text fontWeight="bold">My Blocked List</Text>
                            <DisplayAllBlocked />
                    </VStack>
                </Stack>
                
            </Container>
            
            <SideNav />
        </Container>
    ); 
}
export default FriendsPage;