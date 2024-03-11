import jsIcon from '../icons/js.png';
import nodejsIcon from '../icons/nodejs.png';
import reactIcon from '../icons/react.png';
import defaultIcon from '../icons/filtro-claro.png';

export default function Filter({categoria,handleClickFilter}){
    const iconos={
        "javascript":jsIcon,
        "nodejs":nodejsIcon,
        "react":reactIcon,
        "null":defaultIcon
    }

    const icono=iconos[categoria];
return(
    <>
        <button onClick={()=>{handleClickFilter(categoria)}}
            className="h-8 w-8 sm:h-14 sm:w-14 text-center text-lg"
            style={{ backgroundImage: `url(${icono})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></button>
    </>

);

}