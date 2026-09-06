import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import ImgLogin from '../assets/img-login.jpg';
import { Link, Outlet } from "react-router-dom";

export default function Register() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register(nombre, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.error || "Error al registrarse");
        }
    };

    return (
        <section className="min-h-screen flex flex-col lg:flex-row">
            {/* Formulario */}
            <div className="flex items-center justify-center p-4 w-full lg:w-1/2 min-h-screen lg:min-h-0">
                <div className="w-full max-w-md bg-white rounded-2xl p-2">
                    <h2 className="text-3xl font-bold text-center mb-2">
                        Hola gestor
                    </h2>
                    <p className="text-center text-gray-500 mb-6 text-md">
                        Bienvenido, registrate para continuar
                    </p>

                    {error && (
                        <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="border border-r-4 border-b-4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-r-4 border-b-4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-r-4 border-b-4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button type="submit"
                            className="border-black border-r-4 border-b-4
                         bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg p-2 transition">
                            Registrarse
                        </button>

                        <p>¿Ya tienes cuenta?
                            <Link to="/login" className="text-blue-600 cursor-pointer hover:text-blue-900"> Inicia sesión aqui </Link>
                        </p>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t"></div>
                        <span className="mx-4 text-gray-500">o</span>
                        <div className="flex-1 border-t"></div>
                    </div>

                    <GoogleLoginButton />
                </div>
            </div>
            {/* Imagen */}
            <div className="hidden lg:flex items-center justify-center p-2 rounded-xl w-full lg:w-1/2 lg:min-h-screen">
                <img
                    src={ImgLogin}
                    alt="Login"
                    className="w-full rounded-2xl h-full object-cover"
                />
            </div>

        </section >
    );
}