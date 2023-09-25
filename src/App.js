import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./style.scss";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

import './styles/global.css'


function App() {

  const {currentUser} = useContext(AuthContext);
  //const isAuthenticated = Object.keys(currentUser).length !== 0;

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }
  console.log(!currentUser)
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
