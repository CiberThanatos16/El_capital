import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState, useRef, useEffect } from "react";

import { Cards } from "./components/cards"
import Modal from "./components/modal";
import { Ingreso } from "./components/input-ingreso";
import { Gastos } from "./components/input-gasto";
import { InputMetas } from "./components/input-metas";
import Grafica from "./components/grafica";
import Historial from "./components/historial";
import Metas from "./components/metas";


export const Dashboard = () => {

    const { usuario, logout } = useAuth();
    const navigate = useNavigate();

    // Boton desplegable para cerrar sesion
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    //effect para boton desplegable
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //Navlinks de la vistas del contenedor del capital
    const navLinks = [
        { to: "grafica", label: "Grafica" },
        { to: "historial", label: "Historial" },
        { to: "metas", label: "Metas" }
    ];

    const [openIngreso, setOpenIngreso] = useState(false);
    const [openGasto, setOpenGasto] = useState(false);
    const [openMeta, setOpenMeta] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    return (
        <>
            <section className="p-6 pb-0 w-full">
                <div className="flex justify-between items-center gap-4 pb-4">
                    {/*Nombre de la app*/}
                    <h1 className="text-lg lg:text-3xl font-bold">El Capital</h1>

                    {/*Boton de usuario app*/}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2 border-black border-b-4"
                        >
                            {usuario?.nombre}
                            <span className={`transition-transform ${menuOpen ? "rotate-180" : ""} bg-red-400`}>▾</span>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                                <button
                                    onClick={() => { setMenuOpen(false); setConfirmLogout(true); }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="">
                    <Cards />
                </div>

                <div className="flex justify-between lg:justify-between py-5 gap-2 w-full">
                    <button
                        className="bg-green-600 w-[33%] py-1.5 text-[12px] font-medium border border-black border-r-4 border-b-4"
                        onClick={() => {
                            setOpenIngreso(true)
                        }}>Agregar ingreso
                    </button>

                    <button className="bg-red-600 w-[33%] py-1.5 text-[12px] lg:text-sm font-medium border border-black border-r-4 border-b-4"
                        onClick={() => {
                            setOpenGasto(true)
                        }}>Agregar gasto
                    </button>

                    <button className="bg-blue-600 w-[33%] py-1.5 text-[12px] lg:text-sm font-medium border border-black border-r-4 border-b-4"
                        onClick={() => {
                            setOpenMeta(true)
                        }}>Agregar meta
                    </button>
                </div>
            </section>

            <main className="w-full  flex justify-center items-center p-6">
                <div
                    className="
                            w-full
                            bg-white
                            border border-stone-800
                            border-b-4 border-r-4
                            rounded-2xl
                            py-3
                            "
                >
                    <div className="flex flex-wrap gap-2 justify-between lg:justify-normal  border-b pb-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="flex items-center gap-3 px-6 hover:border-b-4 hover:border-blue-700 transition-all"
                            >
                                <span className="text-sm font-semibold">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="w-full flex justify-center p-5 overflow-x-auto">
                        <Outlet />
                    </div>
                </div>
            </main>

            <Modal isOpen={openIngreso} onClose={() => setOpenIngreso(false)}>
                <Ingreso onClose={() => setOpenIngreso(false)} />
            </Modal>

            <Modal isOpen={openGasto} onClose={() => setOpenGasto(false)}>
                <Gastos onClose={() => setOpenGasto(false)} />
            </Modal>

            <Modal isOpen={openMeta} onClose={() => setOpenMeta(false)}>
                <InputMetas onClose={() => setOpenMeta(false)} />
            </Modal>

            {/* Modal confirmación cerrar sesión */}
            <Modal isOpen={confirmLogout} onClose={() => setConfirmLogout(false)} size="sm">
                <div className="flex flex-col items-center gap-5 py-2">
                    <p className="text-lg font-semibold text-gray-800 text-center">¿Quieres cerrar sesión?</p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => setConfirmLogout(false)}
                            className="flex-1 border border-black border-r-4 border-b-4 py-2 font-medium cursor-pointer hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 bg-red-600 text-white border border-black border-r-4 border-b-4 py-2 font-medium cursor-pointer hover:bg-red-700 transition"
                        >
                            Sí, cerrar sesión
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}