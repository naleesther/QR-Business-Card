import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import ProfileForm from "./Components/ProfileForm";
import Profile from "./Components/Profile";
import QRPage from "./Components/QRPage";
import PublicProfile from "./Components/PublicProfile"



function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/register" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/public-profile/:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
