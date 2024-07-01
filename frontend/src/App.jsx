import Home from "@/pages/Home"
import SignUp from "@/pages/SignUp"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App;