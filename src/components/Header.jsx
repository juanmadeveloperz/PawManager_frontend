import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import parManager from "../assets/img/parManager.png";

const Header = () => {
    const { cerrarSesion } = useAuth();

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <img src={parManager} alt="imagen logo" className="w-30 lg:mb-0"/>
                
                <nav className="flex flex-col items-center lg:flex-row gap-4 mt-2 lg:mt-0 mb-4">
                    <Link to="/admin" className="text-slate-100 text-base uppercase font-black">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-slate-100 text-base uppercase font-black">Perfil</Link>
                    
                    <button 
                        type="button" 
                        className="text-slate-100 text-base uppercase font-black"
                        onClick={cerrarSesion}                   
                    >Cerrar Sesión</button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
