import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

import "./style.scss";
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
