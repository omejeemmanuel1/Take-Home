import { Registeration } from "./pages/Registeration/Registeration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <> 
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registeration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}  />
          <Route path="/adminPage" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
