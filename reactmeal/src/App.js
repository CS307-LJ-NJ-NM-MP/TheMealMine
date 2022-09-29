import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Settings } from "./components/settings"
import { Feed } from "./components/feed"
import { Bookmarks } from "./components/bookmarks"
import { Friends } from "./components/addFriend"


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/settings' element={<Settings/>} ></Route>
        <Route path='/bookmarks' element={<Bookmarks/>} ></Route>
        <Route path='/addFriend' element={<Friends/>} ></Route>
        <Route path='/feed' element={<Feed/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
