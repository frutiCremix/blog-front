import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import FormularioCarga from "./formularioCarga";
import {useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();
  
    function handleEmail(e) {
      setEmail(e.target.value);
      
    }
  
    function handlePassword(e) {
      setPassword(e.target.value);
      
    }
  
    async function handleClick(e) {
        e.preventDefault(); 
      try {
        
        const authResponse = await fetch(`${apiUrl}/authenticate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!authResponse.ok) {
          console.error("Error en la autenticación");
          return;
        }
  
        // Obtener el token de autenticación
        setToken(await authResponse.json());
        console.log(token)
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  
    async function handleLogout() {
      try {
        // Realizar la solicitud al backend para cerrar sesión
        const logoutResponse = await fetch(`${apiUrl}/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (logoutResponse.ok) {
          console.log("Sesión cerrada correctamente");
          // Limpiar el token en el estado local
          setToken(null);
          // Redirigir a la página principal u otra página deseada
          // Puedes usar bibliotecas de enrutamiento o simplemente cambiar la URL según tu implementación
          navigate('/');
        } else {
          console.error("Error al cerrar sesión");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  
    return (
      
        <div>
      {token=="" ? (
        <>
          <Header />
          <div className="w-80 h-screen flex items-center m-auto">
            <form className="bg-orange-200 shadow-sm p-4 flex flex-col items-center justify-between h-auto gap-y-2 w-full">
              <label className="text-lg font-bold">Email</label>
              <input type="text" value={email} onChange={handleEmail} required />

              <label className="text-lg font-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                required
              />
              <button
                className="text-lg font-bold bg-blue-200 p-2 rounded hover:bg-blue-300"
                onClick={handleClick}
              >
                Load!
              </button>
            </form>
          </div>
          <Footer />
        </>
      ) : (
        <FormularioCarga token={token} handleLogout={handleLogout} />
      )}
    </div>
    );
  }
export default LoginForm;
