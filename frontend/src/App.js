import React from "react";
import { Routes, Route} from "react-router-dom";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Home from "./pages/home";

function App() {
  return <div>
       <Routes>
          <Route path="/login" element={<Login />} exact/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
       </Routes>
    </div>
}

export default App;
