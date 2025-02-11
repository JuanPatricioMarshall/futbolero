import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PartidosList from "./pages/PartidosList";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Partido from "./pages/Partido";

function App() {
  return (
    <Router>
      <Navbar />
        {/* Aquí se renderizan las páginas según la URL */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partidos" element={<PartidosList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/partidos/:id" element={<Partido />} />
        </Routes>
    </Router>
  );
}

export default App;