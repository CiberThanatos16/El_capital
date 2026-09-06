import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CapitalProvider } from "./context/CapitalContext";

import Login from "./components/login";
import Register from "./components/register";

import { Dashboard } from "./dashboard";
import Grafica from "./components/grafica";

import Historial from "./components/historial";
import Metas from "./components/metas";
import RutaPrivada from "./components/RutaPrivada"; 

import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <CapitalProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/"
                element={
                  <RutaPrivada>
                    <Dashboard />
                  </RutaPrivada>
                }
              >
                <Route index element={<Grafica />} />
                <Route path="grafica" element={<Grafica />} />
                <Route path="historial" element={<Historial />} />
                <Route path="metas" element={<Metas />} />
              </Route>
            </Routes>
          </Router>
        </CapitalProvider>
      </AuthProvider>
    </>
  )
}

export default App