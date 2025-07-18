import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/user/Home/Home";
import Portfolio from "./pages/Portfolio/Portfolio";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import ContactModal from "./components/user/Contact/Contact";
import QuotationModal from "./components/user/GetQuotation/GetQuotation";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
      </Routes>

      <ContactModal />
      <QuotationModal />
    </Router>
  );
};

export default App;
