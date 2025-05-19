import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); // eslint-disable-line no-unused-vars
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []); 

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y Comienza a Administrar {''}
          <span className="text-black">Tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}

        <div className="mt-5 flex flex-col items-center">
          <Link 
            to="/" 
            className="bg-indigo-700 w-full py-2 px-5 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 text-center"
          >
            Iniciar Sesión
          </Link>

          <Link 
            to="/olvide-password" 
            className="bg-gray-500 w-full py-2 px-5 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-gray-600 text-center"
          >
            Recuperar Contraseña
          </Link>
        </div>
      </div>
    </>
  );
};

export default ConfirmarCuenta;
