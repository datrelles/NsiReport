import { Outlet, useNavigate } from "react-router-dom";
import ButtonNavigate from "../../../common/navbar/ButtonNavigate";

function Info() {

    const navigate = useNavigate();
    const buttons = [
        { text: 'Reportes del Cliente', url: 'archivos' },
        { text: 'Microscopios', url: 'datos-personales' },
        { text: 'Centrifugas', url: 'historial-medico' },
        { text: 'Autoclaves', url: 'diagnostico-dental' },
        { text: 'Baño Maria', url: 'carta-consentimiento' },
        { text: 'Reporte General', url: 'tratamiento' },
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