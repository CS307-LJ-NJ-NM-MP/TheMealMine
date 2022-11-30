import React from "react";
import { Box, Container, Text, Stack, Input, 
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
			var userFriendsList = localStorage.getItem('friendsList');
            var usersBlockedList = localStorage.getItem('blockedList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",");
			} else {
				friendsList = [];
			}
            if (usersBlockedList !== null) {
                blockedList = usersBlockedList.split(",");
            } 
    } else {
        blockedList = localStorage.getItem('searchingBlocked').split(",")
        friendsList = localStorage.getItem('searchingFriends').split(",");
    }

    async function unfollow(e) {
        e.preventDefault();
        const nameToUnfollow = e.target.value;
        var result = await Axios.post('http://localhost:5000/unfollow', {
				user: username,
				name: nameToUnfollow,
                id: Id,
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        setDoRender(e.target.value);
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
            <l>
                {friendsList.map( (name) => (
                FriendDisplay(name)
            ))}</l>
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
        if (requestedBy.length === 0) {
            return (<div></div>)
        } else {
        
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
       }
    }
    const DisplaySearch = (name) => {
        if ( name === username) {
            return (<div></div>);
        } else {
            return (
                <Box border="1px" borderRadius="lg" m="5px 10px 5px 10px">
                    <HStack key={name} padding="5px" spacing="10px">
                        <FormLabel m="0 0 0 10px">{name}</FormLabel>
                        <Button value={name} color="blue"  onClick={addToast}>Open Info</Button>
                        <Button value={name} color="blue"  onClick={close}>Close Info</Button>
                        <Button value={name} color="blue"  onClick={follow}>Follow</Button>
                        <Button value={name} color="red" onClick={blockFromSearchBar}>Block</Button>
                    </HStack>
                </Box>
            );
        }
    }

    function DisplayAllSearch() {
        if (localStorage.getItem('isSearching') === "no") {
            return (<div></div>);
        } else if (searchUsers.length === 0) {
            return (<div></div>); 
        }   else {
            return (
                <Box>
                    <ul>
                        {
                            searchUsers.map( (name) => (
                            DisplaySearch(name)
                        ))}
                    </ul>
                </Box>
            );
        }
    }
    async function search(e) {
       e.preventDefault();
      
        if (e.target.value !== "") {
            await Axios.post('http://localhost:5000/findTheUserReg', {
				search: e.target.value,  
                user: username
			}).then(response => {
                if (response.data.length !== 0) {
                    setSearchUsers(response.data);
                }
                else {
                    setSearchUsers([]);
                }
            });

       blockedList = localStorage.getItem('blockedList').split(",");
       friendsList = localStorage.getItem('friendsList').split(",");
       let blockedTemp = [];
       let friendsTemp = [];
        for (var i = 0; i < blockedList.length; i++) {                  
            if (blockedList[i].includes(e.target.value) === true) {
                blockedTemp.push(blockedList[i]);
            }       
        }
        for (var j= 0; j < friendsList.length; j++) {
            if (friendsList[j].includes(e.target.value) === true) {
                friendsTemp.push(friendsList[j]);
            }
        }
        localStorage.setItem('searchingBlocked', blockedTemp);
        localStorage.setItem('searchingFriends', friendsTemp);
        localStorage.setItem('isSearching', "yes");
    } else {
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
                console.log(parseInt(result.data.ranking));
                var rank = result.data.ranking + "";
                let temp = [];
                temp.push(result.data.user);
                temp.push(rank);
                friends[i] = temp;
            }
            localStorage.setItem('friends',friends);
            window.location = "/friends";
    }

    function ascending() {
        friends = localStorage.getItem('friends').split(",");
        let temp = [];
        for(var i = 0; i < friends.length; i+=2){
            temp.push([friends[i],friends[i+1]]);
        }
        for(var i = 0; i < temp.length; i++){
            for(var j = i; j < temp.length; j++){
                if(temp[i][1] > temp[j][1]){
                    let k = temp[i][1];
                    let l = temp[i][0];
                    temp[i][1] = temp[j][1];
                    temp[i][0] = temp[j][0];
                    temp[j][1] = k;
                    temp[j][0] = l;
                }
            }
        }
        let temp2 = [];
        for(var i = 0; i < friends.length; i+=2){
            temp2.push(
                <Box>
                    <Center>
                        <FormLabel>Name: {friends[i]}</FormLabel>
                        <FormLabel>Ranking: {friends[i+1]}</FormLabel>
                    </Center>
                </Box>
            );
        }
        friends = temp2;
        localStorage.setItem('friends',temp);
        console.log(temp);
        window.location = "/friends";
    }

    function descending() {
        friends = localStorage.getItem('friends').split(",");
        let temp = [];
        for(var i = 0; i < friends.length; i+=2){
            temp.push([friends[i],friends[i+1]]);
        }
        for(var i = 0; i < temp.length; i++){
            for(var j = i; j < temp.length; j++){
                if(temp[i][1] < temp[j][1]){
                    let k = temp[i][1];
                    let l = temp[i][0];
                    temp[i][1] = temp[j][1];
                    temp[i][0] = temp[j][0];
                    temp[j][1] = k;
                    temp[j][0] = l;
                }
            }
        }
        let temp2 = [];
        for(var i = 0; i < friends.length; i+=2){
            temp2.push(
                <Box>
                    <Center>
                        <FormLabel>Name: {friends[i]}</FormLabel>
                        <FormLabel>Ranking: {friends[i+1]}</FormLabel>
                    </Center>
                </Box>
            );
        }
        friends = temp2;
        localStorage.setItem('friends',temp);
        console.log(temp);
        window.location = "/friends";
    }

    if(friends[0] !== ''){
        let temp = [];
        for(var i = 0; i < friends.length; i+=2){
            temp.push(
                <Box>
                    <Center>
                        <FormLabel>Name: {friends[i]}</FormLabel>
                        <FormLabel>Ranking: {friends[i+1]}</FormLabel>
                    </Center>
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
                            <Input id="searchBar" name="searchBar" placeholder="Search for user" onChange={search}/>
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
                                    <Button id="ascending" onClick={unsorted}>Original</Button>
                                    <Button id="ascending" onClick={ascending}>Ascending</Button>
                                    <Button id="descending" onClick={descending}>Descending</Button>
                                </HStack>
                                <Divider/>
                                <VStack id="VStack">
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