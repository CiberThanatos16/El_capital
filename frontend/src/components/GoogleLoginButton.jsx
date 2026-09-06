import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleLoginButton() {
    const buttonRef = useRef(null);
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!window.google) return;

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: async (response) => {
                try {
                    await loginWithGoogle(response.credential);
                    navigate("/");
                } catch (error) {
                    console.error("Error al iniciar sesión con Google", error);
                }
            },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
            
        });
    }, []);

    return <div ref={buttonRef} className="w-full border border-r-4 border-b-4 rounded-md"></div>;
}