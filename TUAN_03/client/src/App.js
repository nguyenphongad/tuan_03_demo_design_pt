import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import Chat from "./Pages/Chat";
import HeaderComponent from "./Components/HeaderComponent";
import { useSelector } from "react-redux";

function App() {

  const user = useSelector((state)=> state.authReducer.authData);

  return (
    <div className="App">
      {user ?<HeaderComponent/>: null }
        <Routes>

          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
          <Route path="/home" element={user ? <Home user={user}/> :  <Navigate to="/login" />}/>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />



          <Route path="*" element={<NotFound/>}/>



        </Routes>

    </div>
  );
}

export default App;
