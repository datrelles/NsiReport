import { Outlet, useNavigate } from "react-router-dom";
import ButtonNavigate from "../../../common/navbar/ButtonNavigate";

function Info() {

    const navigate = useNavigate();
    const buttons = [
        { text: 'Archivos del Cliente', url: 'archivos' },
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
        <>
            <article className="flex flex-row gap-5">
                {buttons.map((button, index) => (
                    <ButtonNavigate
                        key={index}
                        onClick={() => handleView(button.url)}
                        text={button.text}
                    />
                ))}
            </article>
            <Outlet />
        </>
    );
}
export default Info;

// function ButtonNavigate({onClick, text}){
//     return (
//         <div
//             className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
//             onClick={onClick}    
//         >{text}</div>
//     );
// }