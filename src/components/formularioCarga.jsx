import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export default function FormularioCarga({ token, handleLogout }) {
  const [titulo, setTitulo] = useState("");
  const [desc, setDesc] = useState("");
  const [categoria,setCategoria]=useState("");
  const [imagen, setImagen] = useState(null);
  const [archivoMD, setArchivoMD] = useState(null);
  function handleTitulo(e) {
    setTitulo(e.target.value);
    console.log(titulo);
  }
  function handleDesc(e) {
    setDesc(e.target.value);
    console.log(desc);
  }
  function handleCategoria(e){
    setCategoria(e.target.value);
    console.log(categoria);
  }

  async function handleImagen(e) {
    const file = e.target.files[0];

    if (file) {
      // Verificar el tamaño mínimo de la imagen (48x48 px)
      const imageSize = await getImageSize(file);

      if (imageSize.width < 48 || imageSize.height < 48) {
        alert("La imagen debe tener un tamaño mínimo de 48x48 px.");
        // Puedes elegir cómo manejar esta situación, por ejemplo, limpiar el campo de la imagen.
        return;
      }
    }

    setImagen(file);
  }

  function handleArchivoMD(e) {
    const file = e.target.files[0];
    setArchivoMD(file);
  }

  async function handleClick(e) {
    e.preventDefault();
    if (!titulo || !desc || !imagen || !archivoMD || !categoria) {
      console.log("Por favor, complete todos los campos del formulario.");
      return;
    }

    // Preparar la solicitud para cargar el archivo con el token en el encabezado
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("desc", desc);
    formData.append("categoria", categoria);
    formData.append("imagen", imagen);
    formData.append("archivoMD", archivoMD);

    const uploadResponse = await fetch(`${apiUrl}/cargar`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (uploadResponse.ok) {
      console.log("Archivo cargado correctamente");
    } else {
      console.error("Error al cargar el archivo");
    }
  }

  // Función para obtener el tamaño de la imagen
  async function getImageSize(file) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }
  return (
    <>
      <Header />
      <div className="w-80 h-screen flex items-center m-auto">
        <form className="bg-orange-200 shadow-sm p-4 flex flex-col items-center justify-between h-auto gap-y-2 w-full">
          <label className="text-lg font-bold">Titulo</label>
          <input
            id="titulo-mk-file"
            type="text"
            name=""
            value={titulo}
            onChange={handleTitulo}
            required
          />

          <label className="text-lg font-bold">Descripcion breve</label>
          <input type="text" value={desc} onChange={handleDesc} required />

          <label className="text-lg font-bold">Categoria</label>
          <input type="text" value={categoria} onChange={handleCategoria} required />

          <label className="flex flex-col items-center">
            <span className="text-lg font-bold">Cargar Imagen</span>
            <input
              className="bg-orange-100 w-full"
              type="file"
              accept=".png, .jpg, .jpeg, .svg"
              onChange={handleImagen}
              required
            />
          </label>
          <label className="flex flex-col items-center">
            <span className="text-lg font-bold">Cargar Archivo MD</span>
            <input
              className="bg-orange-100 w-full"
              type="file"
              accept=".md"
              onChange={handleArchivoMD}
              required
            />
          </label>
          <button
            className="text-lg font-bold bg-blue-200 p-2 rounded hover:bg-blue-300"
            onClick={handleClick}
          >
            Load!
          </button>
        </form>
        <button
          className="text-lg font-bold bg-blue-200 p-2 rounded hover:bg-blue-300"
          onClick={handleLogout}
        >
          Logout!
        </button>
      </div>

      <Footer />
    </>
  );
}
