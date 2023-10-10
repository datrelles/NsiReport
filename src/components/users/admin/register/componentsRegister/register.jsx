import React from 'react';
// import imgregister from '../../../assets/register/mujer.svg';
import imgregister from '../../../../../assets/registerMujer.png'
import Formulario from './form';
const RegisterForm = () => {


    return (
        <div className='flex font-primary  justify-center pt-24 pb-36 px-6'>
            <div className='flex flex-row bg-gradient-to-t from-white to-gray-300 h-[800px] w-[1000px] rounded-xl shadow-xl'>
                <div className='flex flex-col relative md:w-1/2 mt-10'>
                    <div className='mt-14 ml-20 hidden md:block'>
                        <h1 className='text-6xl text-primary font-bold'>Mejora</h1>

                        <h2 className='text-5xl text-secondary font-bold mt-1 ml-3'>Tu sonrisa</h2>
                    </div>

                    <img src={imgregister} alt='Image' className="absolute transform bottom-0 l:translate-x-[-15%] z-10 hidden md:block" />

                </div>
                {/* <img src={line} alt='Image' className="h-[700px] absolute transform translate-x-16" /> */}
                <div className='md:w-1/2 md:border-l-2 border-white  my-10 md:px-16 px-4'>
                    <h1 className='text-5xl text-primary font-bold text-center my-5'>Crea una cuenta</h1>
                    <Formulario/>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;