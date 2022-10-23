import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Settings } from "./components/settings"
import { Feed } from "./components/feed"
import  Bookmarks  from "./components/bookmarks"
import { Friends } from "./components/addFriend"
import { Login } from "./components/login"
import { SigninPage } from "./SigninPage"
import { Recovery } from "./components/recovery"
import { RecipeAdd } from "./components/recipeCreate"
import { PWReset } from "./components/pwReset"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SigninPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/pwReset' element={<PWReset/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/bookmarks' element={<Bookmarks/>}/>
        <Route path='/addFriend' element={<Friends/>}/>
        <Route path='/feed' element={<Feed/>}/>
		    <Route path='/recovery' element={<Recovery/>}/>
        <Route path='/recipeAdd' element={<RecipeAdd/>}/>
      </Routes>
    </>
  );
}

export default App;