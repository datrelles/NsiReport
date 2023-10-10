import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContex';
import { Nav } from '../../components/common/navbar/Nav';
import { Footer } from '../../components/common/footer/Footer';



export default function PrivateRoute() {
    const { isAuthenticated, role } = useAuthContext();

    if (isAuthenticated && role === 'client') {
        return (
            <>
                <Nav />
                <div className='relative h-[500px]'>
                    <div className='absolute -z-20 w-full h-full'>
                        < Outlet />
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    else {
        return <Navigate to='/' />;
    }

}
