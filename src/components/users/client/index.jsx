import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAgendaById, getFile, uploadFile } from '../../../services/api';
import { useAuthContext } from '../../../context/authContex';
import TableAgenda from './components/TableAgenda';
import NavbarClient from './components/NavbarClient';
import ButtonNavigate from '../../common/navbar/ButtonNavigate';
import { Outlet, useNavigate } from 'react-router-dom';


export default function HomeClient() {

    const navigate = useNavigate();

    const buttons = [
        { text: 'Archivos y Agenda', url: 'archivos' },
        { text: 'Datos Personales', url: 'datos-personales' },
        { text: 'Historial Medico', url: 'historial-medico' },
        { text: 'Diagnostico Dental', url: 'diagnostico-dental' },
        { text: 'Carta de Consentimiento', url: 'carta-consentimiento' },
        { text: 'Tratamiento', url: 'tratamiento' },
    ];

    const handleView = (destination) => {
        navigate(destination);
    };


    return (
        <div>
            <article className="flex flex-row gap-5">
                {buttons.map((data, index)=>(
                    <ButtonNavigate
                        key={index}
                        text={data.text}
                        onClick={() => handleView(data.url)}
                    />
                ))}
            </article>
            <Outlet />
        </div>
    );
}
