import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'

import { useReactToPrint } from "react-to-print";

import { ParamsTable, ParamsTableOptions, ParamsTableUniqueLine } from '../TDsTables';
import { DATA_TABLE_DentistaRows, DATA_TABLE_HistorialMedicoRows } from './dataTableInformacionMedica';
import ButtonImprimir from '../ButtonImprimir';


export default function TableHistorialMedico({data}) {

    const [historialMedico, setHistorialMedico] = useState(null);
    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
    });

    useEffect(() => {
        setHistorialMedico(data)
    },[data])
    
  return (
    <section className='w-full'>
        <ButtonImprimir onClick={exportToPDF} />

        {historialMedico !== null ? 
            <div ref={tablesRef} className='p-10'>

                <table className='w-full my-4'>
                    <thead>
                        <tr className='border w-full'>
                            <th colSpan={4} className='p-2 w-full'>
                                <div className='grid grid-cols-3 items-center'>
                                    <img className='w-32 mx-20' src={Logo} alt='' />
                                    <p className='text-center font-bold text-lg'>HISTORIAL MÉDICO</p>
                                    <div></div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} className='text-center font-semibold'>Por favor marque con una (X) si padece o ha padecido cualquiera de las siguientes enfermedades o problemas:</td> 
                        </tr>
                        {DATA_TABLE_HistorialMedicoRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((field, colIndex) => (
                                    <>
                                        {field.typeComponent == 'Option' ? 
                                            <ParamsTableOptions
                                                key={colIndex}
                                                label={`${field.label} `}
                                                selectedOption={historialMedico.historial_medico[field.field]}
                                            />
                                            :
                                            <ParamsTable
                                                key={colIndex}
                                                colSpan={field.colSpan}
                                                label={`${field.label} `}
                                                text={historialMedico.historial_medico[field.field] || 'NULL'}
                                            />
                                        }
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <section className='my-20'>
                    <h4 className='font-bold text-center'>Certifico que he leído y entendido lo anterior, mis dudas han sido aclaradas y los datos que he proporcionado son verdaderos:</h4>
                    <div className='grid grid-cols-2 w-full gap-20 p-5 pt-24'>
                        <p className='font-bold border-t border-black text-center'>Nobre y firma del paciente (o tutor en caso de ser menor de edad)</p>
                        <p className='font-bold border-t border-black text-center'>Fecha</p>
                    </div>
                </section>

                <table className='w-full my-8'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                        <th colSpan="5" className="!border-none bg-cyan-700 text-white">PARA USO DEL DENTISTA</th>
                        </tr>
                    </thead>
                    <tbody className='border border-black'>
                        {DATA_TABLE_DentistaRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((field, colIndex) => (
                            <ParamsTableUniqueLine
                                key={colIndex}
                                colSpan={field.colSpan}
                                label={`${field.label}`}
                                text={historialMedico.dentistahistorialmedico[field.field] || ''}
                            />
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>

                <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="5">Actualizacion de la historia clínica (si hay cambios en su historial médico):</th>
                        </tr>
                        <tr>
                            <th>Fecha</th>
                            <th>Comentarios</th>
                            <th>Firma del paciente y del dentista</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {Array.from({ length: 7 }, (_, index) => (
                            <tr key={index}>
                                <td>
                                    <p className='!min-h-[4ch]'></p>
                                </td>
                                <td>
                                    <p className='!min-h-[4ch]'></p>
                                </td>
                                <td>
                                    <p className='!min-h-[4ch]'></p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        : ''}
    </section>
  )
}

