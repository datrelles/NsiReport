import { Outlet } from 'react-router-dom';
import { Nav } from '../../components/common/navbar/Nav';
import { Footer } from '../../components/common/footer/Footer';
import { useAuthContext } from '../../context/authContex';
import { PRIVATE } from '../paths';

import React from 'react'

export const PublicRoute = () => {
    const { isAuthenticated, role } = useAuthContext();

    if (isAuthenticated && role === 'client') {

        return <Navigate to={PRIVATE} />;
      }
    return (
        <>
            <Nav />
            
            <div className='relative '>
                <div className='absolute -z-20 w-full h-full'>            
                    <Outlet/>
                    <Footer/>
                </div>
            </div>
            
            
        </>
    )
}








