import { useNavigate } from "react-router-dom";

export default function Article({ id,titulo, desc, url, urlImg, fecha, handler }) {
    const navigate = useNavigate();

  return (
    <li className="flex flex-row hover:bg-gray-200 min-h-min" onClick={()=>{navigate(`/get/${id}`), handler(url)}}>
      <img
        src={urlImg}
        alt="imagen de la tecnología utilizada"
        className="w-16 h-16 ml-2 m-auto"
      />
      <div className="w-full flex flex-col p-2 justify-between">
        <h2 className="font-bold px-2">{titulo}</h2>
        <p className="text-sm px-2">{desc}</p>
        <p className="text-small text-right">{fecha}</p>
      </div>
    </li>
  );
}
