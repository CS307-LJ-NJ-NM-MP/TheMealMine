import React, { useState } from "react";
//import Data from "../src/mockdata.json"
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
            <div className="categorynav">
                <input
                    type="text" 
                    placeholder = "Enter category here"
                    name={"user"}
                    style={{ textAlign: "center"}}
                    onChange={handleChange('comment')}
                />
                <input onClick={sendRequest} type='button' value="Post Comment" id="commentButton"/>
                {textOut}
            </div>
        </>
    );


}
