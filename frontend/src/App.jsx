import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import FavoritesPage from "./FavoritesPage";
import ToursPage from "./ToursPage"; 
import { FavoritesProvider } from "./FavoritesContext";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/tours" element={<ToursPage />} /> 
        <Route path="/excursions" element={<HomePage />} />
        <Route path="/transfer" element={<HomePage />} />
        <Route path="/accommodation" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
