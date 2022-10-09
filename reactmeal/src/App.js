import { Route, Routes } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from "react";
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Settings } from "./components/settings"
import { Feed } from "./components/feed"
import { Bookmarks } from "./components/bookmarks"
import { Friends } from "./components/addFriend"
import { Login } from "./components/login"
import { Signup } from "./components/signup"

function sendMessage() {
	 Axios({
    		method: "GET",
    		url: "http://localhost:5000/",
    		headers: {
      		"Content-Type": "application/json"
    		}
  	}).then(res => {
    		console.log(res.data.message);
  	});
}

function App() {
  return (
    <>
	<button onClick={sendMessage}>Send</button>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/settings' element={<Settings/>} ></Route>
        <Route path='/bookmarks' element={<Bookmarks/>} ></Route>
        <Route path='/addFriend' element={<Friends/>} ></Route>
        <Route path='/feed' element={<Feed/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
