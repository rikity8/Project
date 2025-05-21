import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account"; 
import FavoritesPage from "./FavoritesPage";
import ToursPage from "./ToursPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {/* Если нужно, позже добавишь другие страницы */}
      </Routes>
    </Router>
  );
}

export default App;
