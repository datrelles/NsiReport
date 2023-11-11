import { useState } from "react";
import { InputsInfoPersonal } from "../../../../data/datosPersonales";
import Input from "../../../common/inputs/Input";
import PopupForms from "./components/PopupForms";
import HistorialMedico from "./components/HistorialMedico";
import DatosPersonales from "./components/DatosPersonales";

function Info() {

    const [typeDasboard, setTypeDasboard] = useState('datosPersonales');

    const handleViewDatosPersonales = () => {
        setTypeDasboard('datosPersonales');
    }

    const handleViewHistorialMedico = () => {
        setTypeDasboard('historialMedico');
    }

    return (
        <>
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
            {typeDasboard !== 'datosPersonales' ?
                <DatosPersonales/>
            : 
                <HistorialMedico/>
            }
        </>
    );
}
export default Info;