import Home from "./components/Home";
import Mainpage from "./components/Mainpage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css"
import { useCookies } from 'react-cookie'
import ManageProfile from "./components/ManageProfile"

function App() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user']);
  
  const authToken = cookies.AuthToken;

  return (
    // SOME ROUTES ONLY SHOW IF AUTHTOKEN EXISTS AKA USER IS LOGGED IN
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        { authToken && <Route path="/mainpage" element={<Mainpage />}/>}
        { authToken && <Route path="/account" element={<ManageProfile />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
