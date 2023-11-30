//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/landingPage.js";
import RegistrationPage from "./views/signUpPage.js";
import LoginPage from "./views/logInPage.js";
import MainPage from './views/mainPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
