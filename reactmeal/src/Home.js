import { Link } from "react-router-dom";
import { TopNav } from './topNav'
import { SideNav } from './sideNav'
import { SearchNav } from './searchNav'
import { Pantry } from "./addIngredients";
import React, { useState } from "react";

export const Home = () => {
    const [name, setName] = useState("");

    const FriendsList = [
        { name:'Duke' }
    ];

    const [list, setList] = useState(FriendsList);

    function sendRequest() {
        handleAdd();
        alert("Ingredient Added: " + name);
        console.log(FriendsList);
        setName("");
    }

    function handleAdd() {
        const newList = FriendsList.concat({name});

        setList(newList)
    }

    const handleSubmit = event => {
        event.preventDefault();
//        setName('');
    }
    return (
        
        <>
            
            <TopNav/>
            <div className="home-display">
                <div>
                    <div className='login'>
                        <form className="loginForm" onSubmit={handleSubmit} >
                            Add To Pantry<br/>
                            Ingredient Name:
                            <div>
                                <input type="text" onChange={event => setName(event.target.value)} value={name} />
                            </div>
                            Amount:
                            <div>
                                <input type="text" name="user" />
                            </div>
                            <div>
                                <button type="submit" onClick={sendRequest}>Submit</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
                {list.map(data => (
                    <p>{data.name}</p>
                ))}
                <SideNav/>
            </div>
            
        </>
    );
}
