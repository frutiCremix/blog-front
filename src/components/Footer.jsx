import Social from "./Social"
import { useNavigate } from "react-router-dom"
export default function Footer(){
    const navigate=useNavigate();
    return (
        <footer className="bg-blue-100 w-full h-16 p-4 flex justify-between shadow-sm bottom-0">
            <button className="" onClick={()=>{navigate('/load')}}>&#9881;</button>
            <Social/>        
        </footer>
    )
}