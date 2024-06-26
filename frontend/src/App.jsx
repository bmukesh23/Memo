import Home from "./pages/Home/Home"
import SignUp from "./pages/SignUp/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App;