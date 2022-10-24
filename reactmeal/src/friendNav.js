import React, { useState } from "react";
//import Data from "../src/mockdata.json"
import Axios from "axios";

export const FriendNav = () => {

    const [query, setQuery] = useState("");

    function sendRequest(e) {
//        handleChange();
        findUser(e);
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

    async function findUser(e) {
		e.preventDefault();
        console.log("sending");
		if(formValue.user !== '') {
            console.log("valid: " + formValue.user);
			var result = await Axios.post('http://localhost:5000/findUser', {
				user: formValue.user,  
			})
            .then(response => {
                console.log("result: " + response.data);
                console.log("other result: " + result)
//                console.log("response: " + response);
                if (response.data !== "") {
                    console.log("form value: " + formValue.user)
                    setQuery(formValue.user);
                    console.log("final query: " + query)
                    alert("User " + formValue.user + " found");
                    setQuery("");
                }
                else {
                    alert("error, user not valid")
                    setQuery("");
                }

            })
            .catch(error => {
                console.log(error.data)
                alert("error");
            });
		}
        else {
            alert ("No query");
        }
	}

    
    return (
        <>
            <div className="friendnav">
                <input
                    type="text" 
                    placeholder = "Enter user here"
                    name={"user"}
                    style={{ textAlign: "center"}}
                    onChange={handleChange('user')}
                />
                <input onClick={sendRequest} type='button' value="Find User" id="friendButton"/>

            </div>
        </>
    );


}

//     const [name, setName] = useState("");


//     const [list, setList] = useState(FriendsList);

//     function sendRequest() {

//         handleAdd();
//         alert("Friend Request Sent to: " + name);
//         setName("");
//     }


//     function handleAdd() {
//         const newList = list.concat({name});
//         setList(newList);
//     }


//     const handleSubmit = event => {
//         event.preventDefault();
// //        setName('');
//     }

                /* {list.map(data => (
                    <p>{data.name}</p>
                ))}

                <form onSubmit={handleSubmit}>
                    <div>
                        
                        <label >Send Friend Request:</label>

                        <input
                        type="text" 
                        onChange={event => setName(event.target.value)}
                        value={name}
                        />

                    </div>
                    <div>
                        <input onClick={sendRequest} type="button" value="Send Friend Request" id="friendButton">

                        </input>

                    </div>

                </form> */

//     const dataList = Data.filter(username => {
//         if (query === "") {
// //            alert("User not found");
//         }
//         else if (username.user.toLowerCase().includes(query.toLowerCase())) {
//             return username;
//         }
//     }).map((username) => (
//         <div key={username.id}>
//         <p>{username.user}</p>
//         </div>
//     ));
    