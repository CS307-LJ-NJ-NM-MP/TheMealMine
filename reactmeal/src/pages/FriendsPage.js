import React from "react";
import { Box, Container, Text, Stack, Input, Button, HStack, VStack } from "@chakra-ui/react";
import { TopNav } from "../topNav";
import { SideNav } from "../sideNav";
import { useState } from "react";
import Axios from "axios";
import { useToast } from '@chakra-ui/react'

function FriendsPage() {
    var username = localStorage.getItem('username');
    const [doRender, setDoRender] = useState("no");
    var friendsList = [];
    var blockedList = [];
    const [searchUsers, setSearchUsers] = useState([]);


    console.log("New Refresh");
    var iS = localStorage.getItem('isSearching');

    if (iS === "no") {
            console.log("Is NOT SEARCHING");
			var userFriendsList = localStorage.getItem('friendsList');
            var usersBlockedList = localStorage.getItem('blockedList');
			if(userFriendsList !== null) {
			    friendsList = userFriendsList.split(",");
                //setFriendsList(userFriendsList.split(","));
                //console.log({friendsList});
			} else {
				friendsList = [];
			}
            if (usersBlockedList !== null) {
                blockedList = usersBlockedList.split(",");
               // console.log({blockedList});
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
				name: nameToUnfollow
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        //console.log("New friendsList: " + localStorage.getItem('friendsList'));
        setDoRender(e.target.value);
   
    }
    async function follow(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/follow', {
				user: username,
				name: e.target.value
		});
        var nDoc = document.getElementById("searchBar");
        nDoc.value = "";
        localStorage.setItem('friendsList', result.data.friendsList);
        localStorage.setItem('isSearching', "no");
        //console.log("New friendsList: " + localStorage.getItem('friendsList'));
        setSearchUsers([]);
    }
    async function unblock(e) {
        console.log("in unblock");
        e.preventDefault();
        //console.log("Unfollowing: " + nameToUnfollow);
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
				name: e.target.value
		});
        localStorage.setItem('friendsList', result.data.friendsList);
        localStorage.setItem('blockedList', result.data.blockedList);
        setDoRender(e.target.value);
    }
    async function blockFromSearchBar(e) {
        e.preventDefault();
        var result = await Axios.post('http://localhost:5000/blockUser', {
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

    const toast = useToast()
  const toastIdRef = React.useRef()

  function close() {
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }

  function closeAll() {
    // you may optionally pass an object of positions to exclusively close
    // keeping other positions opened
    // e.g. `{ positions: ['bottom'] }`
    toast.closeAll()
  }

  async function addToast(e) {
    e.preventDefault();
    var result = await Axios.post('http://localhost:5000/findUser', {
				user: e.target.value
		});
        if(result.data.privacy == 'Private'){
            toastIdRef.current = toast({ description: `username: ${result.data.user} privacy: ${result.data.privacy}` })
        }else{
            toastIdRef.current = toast({ description: `username: ${result.data.user} privacy: ${result.data.privacy} Friendslist: ${result.data.friendsList}` })
        }
  }

  async function showInfo(e){
    e.preventDefault();
    var result = await Axios.post('http://localhost:5000/findUser', {
				user: e.target.value
		});

    if(result.data.privacy == 'Private'){
        alert("Username: " + result.data.user + " Privacy: " + result.data.privacy);
    }else{
        alert("Username: " + result.data.user + " Privacy: " + result.data.privacy + " FriendsList: " + result.data.friendsList);
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
    const DisplaySearch = (name) => {
        console.log(name);
        return (
        <HStack key={name} width="400px" spacing="10px" border-style="solid">
            <Text width="200px">{name}</Text>
            <Button value={name} align="right" color="blue"  onClick={addToast}>Open Info</Button>
            <Button value={name} align="right" color="blue"  onClick={close}>Close Info</Button>
            <Button value={name} align="right" color="blue"  onClick={follow}>Follow</Button>
            <Button value={name} align="right" color="red" onClick={blockFromSearchBar}>Block</Button>
        </HStack>
        );
    }


    function DisplayAllSearch() {
        if (localStorage.getItem('isSearching') === "no") {
            return (<div></div>);
        } else {
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
        //find users from search query
        var result = await Axios.post('http://localhost:5000/findTheUserReg', {
				search: e.target.value,  
			}).then(response => {
                console.log("result: " + response.data);
                if (response.data.length != 0) {
                    console.log("Response length: " + response.data.length);
                    setSearchUsers(response.data);
                }
                else {
                     console.log("Nothing in the response.");
                     console.log(response.data);
                     setSearchUsers([]);
                }

            }).catch(error => {
                console.log(error.data)
                alert("errors out the ass");
            });



        //GET FRIENDS AND BLOCKED
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

    return(
        <Container maxW='xl' centerContent>
            <TopNav/>         
            <Container>
                <Stack>
                    <VStack>
                        <Input id="searchBar" name="searchBar" placeholder="Search for user" onChange={search}/>
                        <DisplayAllSearch />
                    </VStack>
                    <Text fontWeight="bold"> My Friends</Text>
                    <VStack>
                            <DisplayAllFriends />
                    </VStack>
                    <br/>
                
                    <VStack>
                            <Text id="blocked" fontWeight="bold">My Blocked List</Text>
                            <DisplayAllBlocked />
                    </VStack>
                </Stack>
                
            </Container>
            
            <SideNav />
        </Container>
    ); 
}
export default FriendsPage;