import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'
import Dientes from '../../../../../../assets/dientes.png'

import { useReactToPrint } from "react-to-print";

import { ParamsTable, ParamsTableOptions, ParamsTableUniqueLine } from '../TDsTables';
import { DATA_TABLE_DentistaRows, DATA_TABLE_HistorialMedicoRows } from './dataTableInformacionMedica';
import ButtonImprimir from '../Buttons/ButtonImprimir';
import moment from "moment";


export default function TableDiagnostico({data = null}) {

    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
    });

    const formatDate = (date) =>{
        const dateFormated = moment(date).format("yyyy-MM-DD");
        return dateFormated !== 'Invalid date' ? dateFormated : "";
    }

    // console.log(data)
    
  return (
    <section className='w-full'>
        <ButtonImprimir onClick={exportToPDF} />

        {data !== null ? 
            <div ref={tablesRef} className='p-10'>

                <table className='w-full my-4'>
                    <thead>
                        <tr>
                            <th colSpan={7} className='p-2 w-full bg-cyan-700 text-white'>DIAGNÓSTICO DENTAL  .  PLAN DE TRATAMIENTO  .   PRESUPUESTO</th>
                        </tr>
                        <tr>
                            <th colSpan={7} className='p-8 w-full border-none'>
                                <img className='mx-auto w-[28rem]' src={Dientes} alt="" />
                            </th>
                        </tr>
                        <tr>
                            <td colSpan={5} className='p-1 border-none'></td>
                            <td colSpan={2} className='p-1'>Fecha: {formatDate(data.dental_diagnosticogeneral.fecha)}</td>
                        </tr>
                        <tr>
                            <th colSpan={7} className='p-2 w-full bg-cyan-700 text-white'>DIAGNÓSTICO</th>
                        </tr>
                        <tr>
                            <th colSpan={7} className='p-2 w-full'></th>
                        </tr>
                        <HeaderTableDientes />
                    </thead>
                    <tbody>
                        {data.dental_dientes.map((data, index)=>(
                            <React.Fragment key={index} >
                                {data.posicion === "arriba-izquierda" || data.posicion === "arriba-derecha" ?
                                    <BodyTRTableDientes
                                        nDiente={data.numero}
                                        diagnostico={data.diagnostico}
                                        presupuesto={data.presupuesto}
                                        fecha={formatDate(data.fecha)}
                                        tratamiento={data.tratamiento}
                                        abono={data.abono}
                                    />
                                : ""}
                            </React.Fragment>
                        ))}
                        <HeaderTableDientes />
                        {data.dental_dientes.map((data, index)=>(
                            <React.Fragment key={index} >
                                {data.posicion === "abajo-izquierda" || data.posicion === "abajo-derecha" ?
                                    <BodyTRTableDientes
                                        nDiente={data.numero}
                                        diagnostico={data.diagnostico}
                                        presupuesto={data.presupuesto}
                                        fecha={formatDate(data.fecha)}
                                        tratamiento={data.tratamiento}
                                        abono={data.abono}
                                    />
                                : ""}
                            </React.Fragment>
                        ))}
                        <tr>
                            <th colSpan={6} className='p-2 bg-cyan-700 text-white'>PLAN DE TRATAMIENTO ADICIONAL</th>
                            <th className='p-2 bg-cyan-700 text-white'>PRESUPUESTO</th>
                        </tr>

                        <BodyTRTableAdicional
                            type={'Quirúrgico'}
                            tratamientoAdicional={data.dental_tratamientoadicional[0].quirurgico}
                            presupuesto={data.dental_tratamientoadicional[0].quirurgico_presupuesto}
                        />
                        <BodyTRTableAdicional
                            type={'Periodontal'}
                            tratamientoAdicional={data.dental_tratamientoadicional[0].periodental}
                            presupuesto={data.dental_tratamientoadicional[0].periodental_presupuesto}
                        />
                        <BodyTRTableAdicional
                            type={'Ortodóntico'}
                            tratamientoAdicional={data.dental_tratamientoadicional[0].ortodontico}
                            presupuesto={data.dental_tratamientoadicional[0].ortodontico_presupuesto}
                        />
                        <BodyTRTableAdicional
                            type={'Otro'}
                            tratamientoAdicional={data.dental_tratamientoadicional[0].otro}
                            presupuesto={data.dental_tratamientoadicional[0].otro_presupuesto}
                        />

                    </tbody>
                </table>

                <section className='my-20'>
                    <div className='flex flex-row justify-center'>
                        <h4 className='font-bold text-center'>PRESUPUESTO VÁLIDO POR SEIS MESES A PARTIR DE ESTA FECHA:</h4>
                        <div className='border-b border-black min-w-[10rem]'></div>
                    </div>
                    <div className='grid grid-cols-2 w-full gap-20 p-5 pt-20'>
                        <p className='font-bold border-t border-black text-center'>Nombre y firma del paciente</p>
                        <p className='font-bold border-t border-black text-center'>Nombre y firma del dentista</p>
                    </div>
                </section>


            </div>
        : ''}
    </section>
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