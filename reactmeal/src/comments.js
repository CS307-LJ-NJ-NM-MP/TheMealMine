import React, { useState } from "react";

import { Box, Button, VStack, Text, Container, Input, Image, Center, Tabs, TabList, Tab,
    TabPanels, TabPanel, FormLabel, HStack} from '@chakra-ui/react'
import Axios from "axios";

export function Comments () {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");

    function sendRequest(e) {
        console.log(localStorage.getItem('username'))
        addComment(e);
        console.log("here is new string" + query)
        setQuery("");
    }

    const [userForm, setUserForm] = useState({
		user: ''
	})

    const [commentForm, setCommentForm ] = useState({
        comment: ''
    })

    const handleChange = name => event => {
		setCommentForm((prevState) => {
			return {
                ...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function addComment(e) {
		e.preventDefault();
        console.log("username" + localStorage.getItem('username'))
        console.log(commentForm.comment)
        console.log("sending");
		if(commentForm.comment !== '') {
            console.log("valid: " + userForm);
			var result = await Axios.post('http://localhost:5000/postComment', {
				user: localStorage.getItem("username"),
                recipe: "Cheese",
                comment: commentForm.comment
			})
            .then(response => {
                console.log("result: " + response.categories);
            })
            .catch(error => {
                console.log(error.data)
                alert("errors out the ass");
            });
		}
        else {
            alert ("No query");
        }
	}
  
     return (
        <>
            <Container className="commentnav">
                <Center>

                <Input
                    type="text" 
                    placeholder = "Type comment here"
                    name={"user"}
                    varient='flushed'
                    onChange={handleChange('comment')}
                />
                <Button onClick={sendRequest} id="commentButton"> Post Comment </Button>
                </Center>
                {textOut}
            </Container>
        </>
    );
}
