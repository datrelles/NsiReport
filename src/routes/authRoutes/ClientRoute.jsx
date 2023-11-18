import React from "react";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { LOGIN } from "../paths";
import { useAuthContext } from "../../context/authContex";
import { Nav } from '../../components/common/navbar/Nav';
import { Footer } from '../../components/common/footer/Footer';

export default function Client(){
    const {isAuthenticated, role}=useAuthContext();
    const navigate = useNavigate();

    const handleViewDatosPersonales = () => {
        navigate('/client/datos-personales');
    }

    const handleViewHistorialMedico = () => {
        navigate('/client/historial-medico');
    }


    // console.log(role)

    if (isAuthenticated && role === 'client') {
        return (
            <>
            <Nav />
            <div className='relative min-h-[500px]'>
                <div className='[absolute] w-full h-full'>
                    <article className="flex flex-row gap-5">
                      <div
                          className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
                          onClick={handleViewDatosPersonales}    
                      >
                          Datos Personales
                      </div>
                      <div
                          className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
                          onClick={handleViewHistorialMedico}    
                      >
                          Historial Medico
                      </div>
                    </article>
                    < Outlet />
                </div>
            </div>
            <Footer />
        </>
        );
      }
      if (!isAuthenticated && role === 'admin') {
        return <Navigate to={LOGIN} />;
      }
    
      else {
        return <Navigate to='/' />;
      }


}