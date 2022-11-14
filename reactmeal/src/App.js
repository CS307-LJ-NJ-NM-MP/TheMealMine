import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Home';
import { Settings } from "./components/settings"
import { Feed } from "./components/feed"
import  Bookmarks  from "./components/bookmarks"
import { Recovery } from "./components/recovery"
import { RecipeAdd } from "./components/recipeCreate"
import { PWReset } from "./components/pwReset"
import SigninPage from './pages/SigninPage';
import FriendsPage from './pages/FriendsPage';
import { Notifications } from './components/notifications';
import  SearchRecipes  from './components/searchRecipes'

window.$username = '';

function App() {
  return (<>
      <Routes>
		    <Route path='/' element={<SigninPage />} ></Route>
        <Route path='/pwReset' element={<PWReset/>}></Route>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/settings' element={<Settings/>} ></Route>
        <Route path='/bookmarks' element={<Bookmarks />} ></Route>
        <Route path='/friends' element={<FriendsPage />} ></Route>
        <Route path='/feed' element={<Feed/>} ></Route>
		    <Route path='/recovery' element={<Recovery/>} ></Route>
        <Route path='/recipeAdd' element={<RecipeAdd/>} ></Route>
        <Route path='/notifications' element={<Notifications/>} ></Route>
        <Route path='/searchRecipes' element={<SearchRecipes/>} ></Route>
      </Routes>
    </>
  );
}

export default App;
