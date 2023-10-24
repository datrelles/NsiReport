import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../context/authContex';
import { Nav } from '../../components/common/navbar/Nav';
import { Footer } from '../../components/common/footer/Footer';



export default function PrivateRoute() {
    const { isAuthenticated, role } = useAuthContext();

    if (isAuthenticated && role === 'admin') {
        return (
            <>
                <Nav />
                <div className='relative min-h-[800px]'>
                    <div className='absolute  w-full h-full'>
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
