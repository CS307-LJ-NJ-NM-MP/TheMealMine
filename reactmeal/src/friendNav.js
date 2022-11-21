import React, { useState } from "react";
import Axios from "axios";

export const FriendNav = () => {

    const [query, setQuery] = useState("");
    const [textOut, setTextOut] = useState("");

    function sendRequest(e) {
        findTheUser(e);
        console.log("here is new string" + query)
        setQuery("");
    }

    const [formValue, setFormValue] = useState({
		user: ''
	})

    const handleChange = name => event => {
		setFormValue((prevState) => {
			return {
				...prevState,
				[name]: event.target.value,
			}
		})
    }

    async function findTheUser(e) {
		e.preventDefault();
        console.log("sending");
		if(formValue.user !== '') {
            console.log("valid: " + formValue.user);
			var result = await Axios.post('http://localhost:5000/findTheUserReg', {
				user: formValue.user,  
			})
            .then(response => {
                console.log("result: " + response);
                if (response.data.length != 0) {
                    setQuery(response.data);
                    setTextOut("" + response.data)
                    setQuery("");
                }
                else {
                     setQuery("");
                     setTextOut("");
                     alert("error, user not valid")
                }

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
   
    return (<>
            <div className="friendnav">
                <input
                    type="text" 
                    placeholder = "Enter user here"
                    name={"user"}
                    style={{ textAlign: "center"}}
                    onChange={handleChange('user')}
                />
                <input onClick={sendRequest} type='button' value="Find User" id="friendButton"/>
                {textOut}
            </div>
        </>
    );
}