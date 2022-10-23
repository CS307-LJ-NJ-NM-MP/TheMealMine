import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";

function FriendsPage() {
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