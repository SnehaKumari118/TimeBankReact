import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import Browse from "./pages/Browse";
import MyResources from "./pages/MyResources";
import MyServices from "./pages/MyServices";
import Offer from "./pages/Offer";
import UploadResource from "./pages/UploadResource";
import Resources from "./pages/Resources";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Browse" element={<Browse />} />
        <Route path="/MyResources" element={<MyResources />} />
        <Route path="/MyServices" element={<MyServices />} />
        <Route path="/Offer" element={<Offer />} />
        <Route path="/UploadResource" element={<UploadResource />} />
        <Route path="/Resources" element={<Resources  />} />
        <Route path="/Profile" element={<Profile />} />


      </Routes>
    </Router>
  );
}

export default App;
