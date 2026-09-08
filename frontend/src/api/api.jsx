import axios from "axios";

/*
//Local host de desarrollo 
const api = axios.create({
    baseURL: "http://localhost:3000/api"
});
*/

//API para produccion en Render/ conexion al backend deployed en Render
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
