import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./pages/Game.jsx";
import Connect from "./pages/Connect.jsx";

function App() {
  return (
    // <div className="App">
    //   <Home></Home>
    // </div>
    <Router>
    <Routes>
      <Route exact path="/" element={<Home></Home>} />
      <Route path="/game" element={<Game></Game>} />
      <Route path="/connect" element={<Connect></Connect>} />
    </Routes>
  </Router>
  );
}

export default App;
