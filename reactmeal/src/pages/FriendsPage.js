import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";

function FriendsPage() {
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var friendsList;
    //&& instead of || ?
    if((username !== null || username !== "Guest") && (password !== null || password !== "Guest")) {
			var userFriendsList = localStorage.getItem('friendsList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",,");
			}else{
				friendsList = [];
			}
	} else {
		friendsList = [];
	}
    return(
        <Container maxW='xl' centerContent>
            <TopNav/>
            
            <Box>
                <Text>Search Bar</Text>
                
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
;
}
export default FriendsPage;