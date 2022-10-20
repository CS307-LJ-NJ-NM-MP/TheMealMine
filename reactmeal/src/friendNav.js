import React, { useState } from "react";
import Data from "../src/mockdata.json"


export const FriendNav = () => {

    const [tempQuery, setTempQuery] = useState("");
    const [query, setQuery] = useState("");

    const dataList = Data.filter(username => {
        if (query === "") {
//            return username;
        }
        else if (username.user.toLowerCase().includes(query.toLowerCase())) {
            return username;
        }
    }).map((username) => (
        <div key={username.id}>
        <p>{username.user}</p>
        {/*        <p>{username.email}</p> */}
        </div>
    ));
    
    function sendRequest() {
        setQuery(tempQuery);
    }

    
    return (
        <>
            <div className="friendnav">
                <input 
                    placeholder = "Enter user here"
                    style={{ textAlign: "center"}}
                    onChange={event => setTempQuery(event.target.value)}
                />
                <input onClick={sendRequest} type='button' value="Find User" id="friendButton"/>

            </div>
            <div br>
                {dataList}
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