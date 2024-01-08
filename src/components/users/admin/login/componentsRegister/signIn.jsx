import React from 'react';
import imgregister from '../../../../../assets/loginMujer.png';
import Formulario from './form';
import { Link } from 'react-router-dom';
const RegisterForm = () => {


    return (
        <div className='flex font-primary bg-white justify-center pt-6 md:pt-24 md:pb-36 px-6'>
            <div className='flex flex-row bg-white h-[755px] w-[1000px] rounded-la shadow-xl '>

                <div className='md:w-1/2 md:border-l-2 border-white  md:my-10 px-16'>
                    <h1 className='text-5xl md:text-6xl text-black font-bold text-center my-5 mt-20'>Inicio de Sesion</h1>
                    <Formulario />
                </div>


                <div className='flex flex-row relative md:w-1/2 mt-10 '>
                    <div className='mt-14 hidden md:block text-center '>
                        <h1 className='text-6xl text-black font-bold'>Sistema de Gestion de Reportes</h1> 
                    </div>

                    <img src={imgregister} alt='Image' className="h-[400px] absolute transform bottom-0 l:translate-x-[6%] z-2 hidden md:block" />

                </div>
            </div>
        </div>
    );
};

export default RegisterForm;