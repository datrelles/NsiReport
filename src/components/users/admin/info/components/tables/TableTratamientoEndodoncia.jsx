import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'

import { useReactToPrint } from "react-to-print";

import ButtonImprimir from '../Buttons/ButtonImprimir';
import { ParamsTable } from '../TDsTables';


export default function TableTratamientoEndodoncia({data = null, admin = true}) {

    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
    });

    console.log(data.dental_tratamientoadicional)
    
  return (
    <section className='w-full'>
        <ButtonImprimir onClick={exportToPDF} />

        {data !== null ? 
            <div ref={tablesRef} className='p-10'>

                <section className='grid grid-cols-3 mb-10'>
                    <img className='w-[40%] mx-20' src={Logo} alt='' />
                    <div></div>
                    <div></div>
                </section>

                <table className='w-full'>
                    <thead>
                        <tr>
                            <th colSpan={2} className="!border-none bg-cyan-700 text-white">ENDODONCIA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <ParamsTable
                                label={`PACIENTE: `}
                                text={''}
                            />
                            <ParamsTable
                                label={`DOCTOR (A): `}
                                text={''}
                            />
                        </tr>
                    </tbody>
                </table>

                <table className='w-full mt-20'>
                    <thead>
                        <tr>
                            <th colSpan={7} className="border-none"></th>
                            <th colSpan={2} className="text-left p-1">Fecha: </th>
                        </tr>
                        <tr>
                            <th colSpan={9} className="">DATOS DEL EXAMEN </th>
                        </tr>
                        <tr>
                            <th colSpan={9} className="bg-cyan-700 min-h-[20ch] text-transparent">.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            
                        </tr>
                    </tbody>
                </table>

                <section className='my-10'>
                    <p>Diagnóstico pulpar de presunción: {""}</p>
                    <p>Diagnóstico periapical: {""}</p>
                    <p>Diagnóstico definitivo: {""}</p>
                    <p>Diagnóstico definitivo: {""}</p>
                </section>

                <section className='my-10 text-center'>
                    <h1 className='font-bold'>ACEPTACIÓN DEL TRATAMIENTO</h1>
                    <p className='text-left'>Doy mi consentimiento para que se me realicen los procedimientos clínicos necesarios para mantener o recobrar mi salud bucal. Estoy de acuerdo en los tratamientos sugeridos por el estomatólogo de la clínica Dental Prado.</p>
                    <div className='flex flex-row gap-10 justify-center w-full mt-20'>
                        <p className='font-bold border-t border-black text-center w-full'>Nombre y firma del paciente</p>
                        <p className='font-bold border-t border-black text-center w-full'>Nombre y firma del dentista</p>
                    </div>
                </section>

                <section className='my-10'>
                    <h1 className='font-bold text-center'>CONSENTIMIENTO INFORMADO</h1>
                    <p className='flex flex-row justify-start'>
                        El/la que suscribe
                        <SpanCartaConsentimiento text={''} />
                        otorgo mi consentimiento y autorizo para recibir atención dental en la CLÍNICA DENTAL PRADO.
                    </p>
                    <p>A propósito declaro haber sido informado y haber comprendido las ventajas de el/los tratamiento(s) que se realizará(n) con el propósito de preservar o recobrar mi salud y tengo pleno conocimiento de los riesgos, estando presentes o que se pueden presentar antes, durante y después del tratamiento y pueden ser, aunque no se limitan, los siguientes:</p>
                    <p>Lesiones leves o graves, ligera molestia, sensibilidad, dolor, inflamación, tumefacción, trismus, infección, alergia, parestesia, pérdida de hueso alveolar, anquilosis, ruptura de instrumentos, perforación radicular, fractura coronal y/o radicular, fracaso del tratamiento, pérdida del diente tratado, arritmia, lipotimia, desmayo, infarto, paro cardiaco, aborto y pérdida de la vida.</p>
                    <p>Enterado de todo esto como paciente doy mi autorización y aceptación del tratamiento y doy mi consentimiento para que el profesional actúe del modo que considere necesario durante los distintos procedimientos clínicos, por el exclusivo interés de mi salud. Asimismo, doy mi autorización para la administración de anestésicos, antibióticos, analgésicos y otras sustancias químicas necesarias para el tratamiento. Si durante o después de la intervención surgiera una situación anátomo-patológica distinta y más grave a la prevista, doy mi consentimiento para que se actúe del modo más conveniente, según la ciencia y conciencia, por el exclusivo interés de mi salud. En caso de que el tratamiento requiera dos o más citas, me comprometo a asistir a ellas en el tiempo indicado hasta que el tratamiento sea completado, de no hacerlo acepto las consecuencias que dicho acto pudiera originar, dando por enterado mi egreso voluntario. Comprendo que el tratamiento endodóntico es sólo un paso en la devolución de la función dental completa, que se debe colocar una restauración final adecuada entre 8 a 15 días después de haber finalizado la intervención endodóntica, y tengo conocimiento de que al no hacerlo las probabilidades de fractura, dolor y/o reinfección aumentan. </p>
                    <p>Es posible que exista adicionalmente al proceso infeccioso o inflamatorio, un cuadro granulomatoso o quístico que requiera la aplicación de otras técnicas terapéuticas. Entiendo que si el tratamiento fracasa puede ser necesario un retratamiento, la intervención quirúrgica del extremo radicular (apicectomía), la eliminación de la raíz afectada (radicectomía) o la extracción del diente tratado. Estando de acuerdo con esto libero de cualquier responsabilidad administrativa, civil, penal al personal de salud por las acciones en el ejercicio de su profesión. </p>
                    <p>Todas mis dudas han sido aclaradas y estoy completamente de acuerdo con lo consignado en este consentimiento.</p>
                    <div className='flex flex-row gap-10 justify-center w-full mt-20'>
                        <p className='font-bold border-t border-black text-center w-full'>Nombre y firma del paciente</p>
                        <p className='font-bold border-t border-black text-center w-full'>Nombre y firma del dentista</p>
                    </div>
                    <p className='flex flex-row justify-start mt-20'>
                        Tijuana. Baja California a
                        <SpanCartaConsentimiento text={''} />
                        de 
                        <SpanCartaConsentimiento text={''} />
                        de 20 
                        <SpanCartaConsentimiento text={''} />.
                    </p>
                </section>
                
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th colSpan={10} className="!border-none bg-cyan-700 text-white">TRATAMIENTO DE ENDODONCIA</th>
                        </tr>
                        <tr>
                            <th colSpan={1} className="text-xs text-left p-1">DIENTE: {""}</th>
                            <th colSpan={1} className="text-xs text-left p-1">VITAL: {""}</th>
                            <th colSpan={2} className="text-xs text-left p-1">NECRÓTICO: {""}</th>
                            <th colSpan={1} className="text-xs text-left p-1">COSTO: {""}</th>
                            <th colSpan={2} className="text-xs text-left p-1">FECHA DE INICIO: {""}</th>
                            <th colSpan={3} className="text-xs text-left p-1">FECHA DE OBTURACIÓN: {""}</th>
                        </tr>
                        <tr>
                            <th colSpan={10} className='text-transparent'>.</th>
                        </tr>
                        <tr>
                            <th className='font-medium'>FECHA</th>
                            <th className='font-medium'>PROCEDIMIENTO</th>
                            <th className='font-medium'>CONDUCTO</th>
                            <th className='font-medium'>CONDUCTOM. TENTATIVA</th>
                            <th className='font-medium'>CONDUCTOM. DEFINITIVA</th>
                            <th className='font-medium'>REFERENCIA</th>
                            <th className='font-medium'>ÚLTIMA LIMA APICAL</th>
                            <th className='font-medium'>NOTAS</th>
                            <th className='font-medium'>ABONO</th>
                            <th className='font-medium'>BALANCE</th>
                            {admin ? 
                                <th className='font-medium'>OPCIONES</th>
                            : ""}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=''>2023-02-05</td>
                            <td className=''>Necesitamos convertir</td>
                            <td className=''>concutdo</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            <td className=''>nosde dasda be</td>
                            {admin ? 
                                <td>
                                    <div className='flex flex-row gap-1'>
                                        <button onClick={false} className='text-xs py-1 px-2 bg-green-700 rounded-lg m-2 text-white'>Actualizar</button>
                                        <button onClick={false} className='text-xs py-1 px-2 bg-red-700 rounded-lg m-2 text-white'>Borrar</button>
                                    </div>
                                </td>
                            : ""}
                        </tr>
                        
                    </tbody>
                </table>

            </div>
        : ''}
    </section>
  )
}


function TextCartaConsentimiento({title, text, center=false}) {
    return (
        <p className={`flex flex-row ${center ? 'justify-center' : 'items-start'}`}>
            {title} <span className={`${text ? 'underline' : 'border-b border-black min-h-[3ch] w-full'} ml-2`}>{text}</span>
        </p>
    )
}
function SpanCartaConsentimiento({text}) {
    return (
        <span className='border-b border-black min-w-[10ch] mx-2'>{text}</span>
    )
}



const THTableDientes = ({ children }) => <th className='p-2 bg-cyan-700 text-white'>{children}</th>;
function HeaderTableDientes(){
    return (
        <tr>
            <THTableDientes>DIENTE</THTableDientes>
            <THTableDientes>DIAGNÓSTICO Y TRATAMIENTO</THTableDientes>
            <THTableDientes>PRESUPUESTO</THTableDientes>
            <THTableDientes>FECHA</THTableDientes>
            <THTableDientes>TRATAMIENTO</THTableDientes>
            <THTableDientes>ABONO</THTableDientes>
            <THTableDientes>SALDO</THTableDientes>
        </tr>
    );
}

const TDTableDientes = ({ children }) => <td className='text-center'>{children}</td>
function BodyTRTableDientes({nDiente, diagnostico, presupuesto=0, fecha, tratamiento, abono=0}){

    const saldo = presupuesto - abono;

    return (
        <tr>
            <TDTableDientes>{nDiente}</TDTableDientes>
            <TDTableDientes>{diagnostico}</TDTableDientes>
            <TDTableDientes>{presupuesto}</TDTableDientes>
            <TDTableDientes>{fecha}</TDTableDientes>
            <TDTableDientes>{tratamiento}</TDTableDientes>
            <TDTableDientes>{abono}</TDTableDientes>
            <TDTableDientes>{saldo}</TDTableDientes>
        </tr>
    );
}

function BodyTRTableAdicional({type, tratamientoAdicional, presupuesto=0}){
    return (
        <>
            <tr>
                <td colSpan={6} className='p-1'>{type}: {tratamientoAdicional}</td>
                <td className='p-1'>{presupuesto}</td>
            </tr>
        </>
    );
}