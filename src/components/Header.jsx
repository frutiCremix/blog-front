import Social from "./Social";
import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate= useNavigate()
    return(
        <header className="top-0 left-0 bg-blue-100 w-full h-16 p-4 flex justify-between shadow-sm">
            
            <h1 className="text-lg font-bold" onClick={()=>{navigate('/')}}>WebFluency</h1>
            <Social/>
        </header>
    )
}