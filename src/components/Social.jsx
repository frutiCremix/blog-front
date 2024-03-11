import gitHub from '../icons/github.svg'
export default function Social(){
    return (
        <ul className="flex gap-x-2 h-full items-center">
            <a href='https://www.linkedin.com/in/sebastianoliveto/' target='__blank'>
                <li>
                    <img className="w-6 h-6" src="https://img.icons8.com/color/48/linkedin.png" alt="linkedin"/>
                </li>
            </a>
            <a href='https://github.com/frutiCremix' target='__blank'>   
                <li>
                    <img className="w-6 h-6" src={gitHub} alt="icnono de github" />
                </li>
            </a>
            <a href='mailto:sebastian.oliveto@hotmail.com'>
                <li>
                    <img className='w-6 h-6' src="https://img.icons8.com/cotton/64/secured-letter--v3.png" alt="icono de email"/>
                </li>
            </a>    
        </ul>
    )
}