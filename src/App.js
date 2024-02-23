import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserLoggedIn(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={userLoggedIn ? <Dashboard /> : <Homepage />}
            />
            {/* <Route path="/" element={<Homepage />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
