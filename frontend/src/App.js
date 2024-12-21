import Home from './home';
import './App.css';
import './pages/singlepage';
import {Routes,Route, useParams } from 'react-router-dom';
import Singlepage from './pages/singlepage';
import Signin from './pages/signin';
import Watchlist from './pages/watchlist';
import Signup from './pages/signup';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/singlepage/:id" element={<Singlepage/>} ></Route>
        <Route path="/signin" element={<Signin/>} key={"signin"}> </Route>
        <Route path="/watchlist" element={<Watchlist/> } > </Route>
        <Route path="/signup" element={<Signup/> } > </Route>
        <Route path='*' element={<div>error 404 </div> } ></Route>
      </Routes>
    </div>
  );
}

export default App;
