//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./views/landingPage.js";
import RegistrationPage from "./views/signUpPage.js";
import LoginPage from "./views/logInPage.js";
import MainPage from './views/mainPage.js';
import ItemPage from './views/itemPage.js';
import OwnerLogin from './views/ownerLogin.js';
import OwnerPage from './views/ownerPage.js';
import OwnerOrdersPage from './views/ownerOrdersPage.js';
import OwnerRepairPage from './views/ownerRepairsPage.js';
import OwnerProfilePage from './views/ownerProfilePage.js';
import OwnerInventoryPage from './views/ownerInventoryPage.js';
import CartPage from './views/cartPage.js';
import UserRepairsPage from './views/userRepairsPage.js';
import UserOrdersPage from './views/userOrdersPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/owner-login" element={<OwnerLogin />} />
        <Route path="/owner" element={<OwnerPage /> } />
        <Route path="/owner-orders" element={<OwnerOrdersPage /> } />
        <Route path="/owner-repairs" element={<OwnerRepairPage /> } />
        <Route path="/owner-profile" element={<OwnerProfilePage /> } />
        <Route path="/owner-inventory" element={<OwnerInventoryPage /> } />
        <Route path="/cart" element={<CartPage /> } />
        <Route path="/user-repairrequests" element={<UserRepairsPage /> } />
        <Route path="/user-orders" element={<UserOrdersPage /> } />       
      </Routes>
    </div>
  );
}

export default App;
