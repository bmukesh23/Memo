import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
    </Routes>
  </Router>
)

function App() {
  return (
    { routes }
  )
}

export default App;