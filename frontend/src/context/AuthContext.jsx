import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/elcapital/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        setUsuario(res.data.usuario);
    };

    const loginWithGoogle = async (credential) => {
        const res = await api.post("/elcapital/auth/google", { credential });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
        setUsuario(res.data.usuario);
    };

    const register = async (nombre, email, password) => {
        await api.post("/elcapital/auth/register", { nombre, email, password });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, register, logout, loginWithGoogle, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}