

import React, { useState } from "react";

export const FriendNav = () => {
    const [name, setName] = useState("");

    const FriendsList = [
        { name: 'Dick' },
        { name: 'Jason' },
        { name: 'Tim' },
        { name: 'Damian' },
        { name:'Duke' }
    ];

    const [list, setList] = useState(FriendsList);

    function sendRequest() {
        handleAdd();
        alert("Friend Request Sent to: " + name);
        setName("");
    }

    function handleAdd() {
        const newList = list.concat({name});

        setList(newList)
    }

    const handleSubmit = event => {
        event.preventDefault();
//        setName('');
    }
    
    return (
        <>
            <div className="friendnav">

                {list.map(data => (
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
                        <button type="button" onClick={sendRequest}>
                            Send Friend Request
                        </button>

                    </div>

                </form>
                    
                    
            </div>

        </>
    )

}