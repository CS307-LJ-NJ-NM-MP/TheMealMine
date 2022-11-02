import React from "react";
import { Box, Container, Text, Stack, Input, Button, HStack, VStack } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";
import Axios from "axios";

function FriendsPage() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    const [doRender, setDoRender] = useState("");
    var friendsList;
    //const [friendsList, setFriendsList] = useState([]);
    var blockedList;
    //var tempName = localStorage.setItem('tempName', "guest");
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
                //setFriendsList(userFriendsList.split(","));
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
    async function unfollow(e) {
        e.preventDefault();
        const nameToUnfollow = e.target.value;
        console.log("Unfollowing: " + nameToUnfollow);
        var result = await Axios.post('http://localhost:5000/unfollow', {
				user: username,
				name: nameToUnfollow
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        console.log("New friendsList: " + localStorage.getItem('friendsList'));
        setDoRender(e.target.value);
   
    }
    async function unblock(e) {
        e.preventDefault();
        //console.log("Unfollowing: " + nameToUnfollow);
        var result = await Axios.post('http://localhost:5000/unblock', {
				user: username,
				name: e.target.value
		});
        //console.log("Getting new friendsList " + result.friendsList[0] +  " hello");
        //localStorage.setItem('friendsList', result.friendsList);
        localStorage.setItem('blockedList', result.data.blockedList);
        console.log("New blockedList: " + localStorage.getItem('blockedList'));
        setDoRender(e.target.value);
    }
    async function block(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/blockUser', {
				user: username,
				name: e.target.value
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        localStorage.setItem('blockedList', result.data.blockedList);
        setDoRender(e.target.value);
    }

    const FriendDisplay = (name) => {
        return (
        <HStack key={name} width="400px" spacing="10px" border-style="solid">
            <Text width="200px">{name}</Text>
            <Button value={name} align="right" color="blue" 
                onClick={unfollow}>
                    Unfollow</Button>
            <Button value={name} align="right" color="blue"
            onClick={block}>Block</Button>
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
            <Button value={name} align="right" color="blue" onClick={unblock}>Unblock</Button>
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