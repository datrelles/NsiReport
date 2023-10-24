import React from 'react'
import AuthContextProvider from '../context/authContex';
import {
    REGISTER,
    LOGIN,
    OUR,
    BRAND,
    CATEGORIES,
    CATEGORY,
    TERMINOS,
    PRIVACY,
    PRIVATE,
    CLIENT
} from './paths'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PublicRoute } from './authRoutes/PublicRoutes'
import PrivateRoute from "./authRoutes/PrivateRoute";
import ClientRoute from './authRoutes/ClientRoute'
//
import Register from '../components/users/admin/register';
import SignIn from '../components/users/admin/login';
import Home from '../components/home';
import AdminDashBoard from '../components/users/admin/adminUser';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicRoute />,
        children: [
            {
                index: true,
                element:<Home/>
            },
            {
                path: REGISTER,
                element: <Register/>
            },
            {
                path: LOGIN,
                element: <SignIn/>
            },
            {
                path: OUR,
                element: <h1 className='text-3xl'> NOSOTROS</h1>
            },
            {
                path: BRAND,
                element: <h1 className='text-3xl' >AGENDAR CITAS</h1>
            },
            {
                path: CATEGORIES,
                element: <h1 className='text-3xl'>LABORATORIOS</h1>
            },
            {
                path: CATEGORY,
                element: <h1 className='text-3xl'>CATEGORIA </h1>
            },
            {
                path: TERMINOS,
                element: <h1 className='text-3xl'>TERMINOS </h1>
            },
            {
                path: PRIVACY,
                element: <h1 className='text-3xl'>Politicas de privacidad </h1>
            },

        ]
    },

    {
        path: PRIVATE,
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <AdminDashBoard/>
            },

        ]

    },

    {
        path: CLIENT,
        element: <ClientRoute />,
        children: [
            {
                index: true,
                element: <h1>HOME CLIENTE</h1>
            },
            {

            }


        ]
    },

    {
        path: '*',
        element: <h1 className='text-3xl'>ERROR PAGINA NO ENCONTRADA</h1>
    }
])

export const Routes = () => (
    <>
        <AuthContextProvider >
            <RouterProvider router={router} />
        </AuthContextProvider>
    </>
)


