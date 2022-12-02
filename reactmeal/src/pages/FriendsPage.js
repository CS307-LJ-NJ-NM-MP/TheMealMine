import React from "react";
import { Box, Container, Text, Image, Input, 
        Center, Button, HStack, VStack, FormLabel, Divider } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";
import Axios from "axios";
import { useToast } from '@chakra-ui/react'

function FriendsPage() {
    var username = localStorage.getItem('username');
    var id = localStorage.getItem('id');
    const [doRender, setDoRender] = useState("no");
    var Id = localStorage.getItem('id'); 
    var friendsList = [];
    var blockedList = [];
    const [searchUsers, setSearchUsers] = useState([]);
    var requestedBy = [];
    if (localStorage.getItem('requestedBy') !== null) {
        requestedBy = localStorage.getItem('requestedBy').split(",");
    }

    var iS = localStorage.getItem('isSearching');

    if (iS === "no") {
            var usersBlockedList = localStorage.getItem('blockedList');
            if (usersBlockedList !== null) {
                blockedList = usersBlockedList.split(",");
            } 
    } else {
        blockedList = localStorage.getItem('searchingBlocked').split(",");
    }

    async function follow(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/follow', {
				user: username,
				name: e.target.value,
                id: Id,
		});
        if (result.data.user === e.target.value) {
            alert("Sent friend request to: " + result.data.user);
           localStorage.setItem('friendsList', result.data.friendsList); 
        } 
        var nDoc = document.getElementById("searchBar");
        nDoc.value = "";
        localStorage.setItem('isSearching', "no");
        setSearchUsers([]);
    }

    async function unblock(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/unblock', {
				user: username,
				name: e.target.value
		});
        localStorage.setItem('blockedList', result.data.blockedList);
        setDoRender(e.target.value);
    }

    async function block(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/blockUser', {
				user: username,
				name: e.target.value,
                id: Id,
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        localStorage.setItem('blockedList', result.data.blockedList);
        setDoRender(e.target.value);
    }

    async function blockFromSearchBar(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/blockUser', {
                id: Id,
				user: username,
				name: e.target.value
		});
        var nDoc = document.getElementById("searchBar");
        nDoc.value = "";
        localStorage.setItem('friendsList', result.data.friendsList);
        localStorage.setItem('blockedList', result.data.blockedList);
        localStorage.setItem('isSearching', "no");
        setSearchUsers([]);
    }

    async function accept(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/acceptRequest', {
				user: username, 
				name: e.target.value,
                state: e.target.name,
                id: Id,
		});
        localStorage.setItem('requestedBy', result.data.requestedBy);
        requestedBy = localStorage.getItem('requestedBy').split(",");
        setDoRender(e.target.value);
    }

    const toast = useToast()
    const toastIdRef = React.useRef()

    function close() {
        if (toastIdRef.current) {
        toast.close(toastIdRef.current)
        }
    }

    async function addToast(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/findUser', {
                    user: e.target.value
        });
        if(result.data.privacy === 'Private'){
            toastIdRef.current = toast({ description: `username: ${result.data.user} privacy: ${result.data.privacy}`})
        }else{
            toastIdRef.current = toast({ description: `username: ${result.data.user} privacy: ${result.data.privacy} Friendslist: ${result.data.friendsList}` })
        }
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
        if(blockedList[0] !== ''){
            return (
                <Box>
                <ul>
                {
                    blockedList.map( (name) => (
                    BlockedDisplay(name)
                ))}</ul>
                </Box>
            );
        }else{
            return (
                <Text>You have not blocked any users</Text>
            );
       }
    }

    const RequestedDisplay = (name) => {
        return (
            <Box borderStyle="solid">
            <HStack key={name} width="400px" spacing="10px" >
                <Text width="200px">{name}</Text>
                <Button value={name} name="accept" align="right" color="blue" onClick={accept}>Accept</Button>
                <Button value={name} name="deny" align="right" color="red" onClick={accept}>Deny</Button>
            </HStack>
            </Box>
        )
    }

    function DisplayAllRequested() {
        if (requestedBy[0] !== '') {
            return (
                <Box id="displayRequested">
                    <ul>
                        {
                            requestedBy.map( (name) => (
                            RequestedDisplay(name)
                        ))}
                    </ul>
                </Box>
            );
       }else{
            return (
                <Text>You currently have no friend requests</Text>
            );
       }
    }
    
    const DisplaySearch = (name) => {
            return (
                <Box border="1px" borderRadius="lg" m="5px 10px 5px 10px">
                    <HStack key={name[0]} padding='5px'>
                        <Image w='50px' h='50px' borderRadius='full' src={name[1]}/>
                        <FormLabel>{name[2]}</FormLabel>
                        <FormLabel>Ranking: {name[3]}</FormLabel>
                        <Button value={name[2]} color="blue"  onClick={addToast}>Open Info</Button>
                        <Button value={name[2]} color="blue"  onClick={close}>Close Info</Button>
                        <Button value={name[2]} color="blue"  onClick={follow}>Follow</Button>
                        <Button value={name[2]} color="red" onClick={blockFromSearchBar}>Block</Button>
                    </HStack>
                </Box>
            );
    }

    function DisplayAllSearch() {
        if(searchUsers.length !== 0){
            return (
                <Box>
                    <VStack maxH="300px" overflow="hidden" overflowY="scroll" p={2}
                        sx={{
                            '&::-webkit-scrollbar': {
                            width: '0px',
                            backgroundColor: `transparent`,
                            },
                            '&::-webkit-scrollbar-thumb': {
                            backgroundColor: `transparent`,
                            },
                        }}>
                        {
                            searchUsers.map( (name) => (
                            DisplaySearch(name)
                        ))}
                    </VStack>
                </Box>
            );
        }else{
            return (
                <Text>Use the searchbar to find other users</Text>
            );
       }
        
    }

    async function search(e) {
        e.preventDefault();
        if (isNaN(e.target.value) && e.target.value !== '') {
            await Axios.post('http://localhost:5000/findTheUserReg', {
                search: e.target.value,  
                user: username
            }).then(response => {
                if(response.data.length !== 0) {
                    setSearchUsers(response.data);
                }else{
                    setSearchUsers([]);
                }
            });
        }else if(!isNaN(e.target.value) && e.target.value !== ''){
            await Axios.post('http://localhost:5000/findTheUserReg', {
                search: e.target.value,  
                user: username
            }).then(response => {
                if(response.data.length !== 0) {
                    setSearchUsers(response.data);
                }else{
                    setSearchUsers([]);
                }
            });
        }else{
            setSearchUsers([]);
            localStorage.setItem('isSearching', "no");
        }
        setDoRender(e.target.value);
    }

    let friends = localStorage.getItem('friends').split(",");
    
    async function unsorted() {
        var result = await Axios.post('http://localhost:5000/getFriends', {
                _id: id
        }); 
        let friends = result.data;
        for(var i = 0; i < friends.length; i++){
            result = await Axios.post('http://localhost:5000/getFriendRanks', {
                _id: friends[i]
            });
            console.log(result.data);
            let temp = [];
            temp.push(result.data.user);
            temp.push(result.data.ranking);
            temp.push(result.data.image);
            friends[i] = temp;
        }
        localStorage.setItem('friends',friends);
        window.location = "/friends";
    }

    function ascending() {
        friends = localStorage.getItem('friends').split(",");
        let temp = [];
        for(var i = 0; i < friends.length; i+=3){
            temp.push([friends[i],friends[i+1],friends[i+2]]);
        }
        for(var i = 0; i < temp.length; i++){
            for(var j = i; j < temp.length; j++){
                if(temp[i][1] > temp[j][1]){
                    let k = temp[i][1];
                    let l = temp[i][0];
                    let m = temp[i][2];
                    temp[i][1] = temp[j][1];
                    temp[i][0] = temp[j][0];
                    temp[i][2] = temp[j][2];
                    temp[j][1] = k;
                    temp[j][0] = l;
                    temp[j][2] = m;
                }
            }
        }
        localStorage.setItem('friends',temp);
        window.location = "/friends";
    }

    function descending() {
        friends = localStorage.getItem('friends').split(",");
        let temp = [];
        for(var i = 0; i < friends.length; i+=3){
            temp.push([friends[i],friends[i+1],friends[i+2]]);
        }
        for(var i = 0; i < temp.length; i++){
            for(var j = i; j < temp.length; j++){
                if(temp[i][1] < temp[j][1]){
                    let k = temp[i][1];
                    let l = temp[i][0];
                    let m = temp[i][2];
                    temp[i][1] = temp[j][1];
                    temp[i][0] = temp[j][0];
                    temp[i][2] = temp[j][2];
                    temp[j][1] = k;
                    temp[j][0] = l;
                    temp[j][2] = m;
                }
            }
        }
        localStorage.setItem('friends',temp);
        window.location = "/friends";
    }

    if(friends[0] !== ''){
        let temp = [];
        for(var i = 0; i < friends.length; i+=3){
            temp.push(
                <Box border="1px" borderRadius="lg" m="5px 10px 5px 10px">
                    <HStack padding='5px'>
                        <Image w='50px' h='50px' borderRadius='full' src={friends[i+2]}/>                       <FormLabel>{friends[i]}</FormLabel>
                        <FormLabel>Ranking: {friends[i+1]}</FormLabel>
                    </HStack>
                </Box>
            );
        }
        friends = temp;
    }else{
        friends = [<Text>No Friends to Display</Text>];
    }
    return(
        <Container maxW="100%">
            <TopNav/>
                <Center padding="10px">
                    <Box w="80%" border="1px" borderRadius="lg">
                        <VStack m="10px 10px 10px 10px">
                            <Input id="searchBar" name="searchBar" placeholder="Search for user by 'name' or 'ranking #'" onChange={search}/>
                            <Divider/>
                            <DisplayAllSearch />
                        </VStack>
                    </Box>
                </Center>
                <Center padding="10px">
                    <Box w="80%" border="1px" borderRadius="lg">
                        <Center padding="10px">
                            <VStack>
                            <FormLabel> My Friends</FormLabel>
                                <HStack spacing="10px">
                                    <Button id="unsorted" onClick={unsorted}>Original</Button>
                                    <Button id="ascending" onClick={ascending}>Ascending</Button>
                                    <Button id="descending" onClick={descending}>Descending</Button>
                                </HStack>
                                <Divider/>
                                <VStack m="10px 10px 0 10px" maxH="200px" overflow="hidden" overflowY="scroll"
                                    sx={{
                                        '&::-webkit-scrollbar': {
                                        width: '0px',
                                        backgroundColor: `transparent`,
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: `transparent`,
                                        },
                                    }}>
                                    {friends}
                                </VStack>
                            </VStack>
                        </Center>
                    </Box>
                </Center>
                <Center padding="10px">
                    <Box w="80%" border="1px" borderRadius="lg">
                        <Center padding="10px">
                            <VStack>
                                <Text id="blocked" fontWeight="bold">My Blocked List</Text>
                                <DisplayAllBlocked />
                            </VStack>
                        </Center>
                    </Box>
                </Center>
                <Center padding="10px">
                    <Box w="80%" border="1px" borderRadius="lg">
                        <Center padding="10px">
                            <VStack>
                                <Text fontWeight="bold">Friend Requests</Text>
                                    <DisplayAllRequested />
                            </VStack>
                        </Center>
                    </Box>
                </Center>
            <SideNav />
        </Container>
    ); 
}
export default FriendsPage;