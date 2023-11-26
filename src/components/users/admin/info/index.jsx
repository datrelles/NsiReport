import { useState } from "react";
import { InputsInfoPersonal } from "../../../../data/datosPersonales";
import Input from "../../../common/inputs/Input";
import PopupForms from "./components/PopupForms";
import HistorialMedico from "./components/HistorialMedico";
import DatosPersonales from "./components/DatosPersonales";
import { Outlet, useNavigate } from "react-router-dom";

function Info() {

    const [typeDasboard, setTypeDasboard] = useState('datosPersonales');

    const navigate = useNavigate();

    
    const handleViewDatosPersonales = () => {
        navigate('datos-personales')
        // setTypeDasboard('datosPersonales');
    }
    const handleViewHistorialMedico = () => {
        navigate('historial-medico')
        // setTypeDasboard('historialMedico');
    }
    const handleViewGestionCitas = () => {
        navigate('gestion-citas')
        // setTypeDasboard('historialMedico');
    }
    
    return (
        <>
            <article className="flex flex-row gap-5">
                <ButtonNavigate
                    onClick={handleViewDatosPersonales}
                    text={'Datos Personales'}
                />
                <ButtonNavigate
                    onClick={handleViewHistorialMedico}
                    text={'Historial Medico'}
                />
                <ButtonNavigate
                    onClick={handleViewGestionCitas}
                    text={'Gestion de Citas'}
                />
            </article>
            <Outlet />
            {/* {typeDasboard == 'datosPersonales' ?
                <DatosPersonales/>
            : 
                <HistorialMedico/>
            } */}
        </>
    );
}
export default Info;

function ButtonNavigate({onClick, text}){
    return (
        <div
            className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
            onClick={onClick}    
        >{text}</div>
    );
}