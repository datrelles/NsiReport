import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'

import { useReactToPrint } from "react-to-print";

import ButtonImprimir from '../Buttons/ButtonImprimir';


export default function TableCartaConsentimiento({data = null}) {

    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
    });

    // console.log(data)
    
  return (
    <section className='w-full'>
        <ButtonImprimir onClick={exportToPDF} />

        {data !== null ? 
            <div ref={tablesRef} className='p-10'>

                <section className='grid grid-cols-3'>
                    <img className='w-[40%] mx-20' src={Logo} alt='' />
                    <div className='text-center font-bold'>
                        <h1>CARTA DE CONSENTIMIENTO Y ACEPTACIÓN</h1>
                        <h1>DENTAL PRADO</h1>
                        <h1 className='font-semibold'>Av. De las Presas No. 177740, fraccionamiento Lomas de la Presa.</h1>
                    </div>
                    <div></div>
                </section>

                <section>
                    <article className='text-center mt-4'>
                        <TextCartaConsentimiento
                            center={true}
                            title={'Estomatólogo: '}
                            text={data.estomatologo}
                        />
                        <p className='flex flex-row justify-end'>
                            Tijuana. Baja California a
                            <SpanCartaConsentimiento text={data.direccion ? data.direccion.part1 : ''} />
                            de 
                            <SpanCartaConsentimiento text={data.direccion ? data.direccion.part2 : ''} />
                            de 20 
                            <SpanCartaConsentimiento text={data.direccion ? data.direccion.part3 : ''} />.
                        </p>
                    </article>
                    <article className='py-10'>
                        <TextCartaConsentimiento
                            title={'Descripción de la intervención: '}
                            text={data.descripcion_intervencion}
                        />
                        <TextCartaConsentimiento
                            title={'Objetivos que se persiguen:  '}
                            text={data.objetivos_perseguidos}
                        />
                        <TextCartaConsentimiento
                            title={'Molestias y riesgos más importantes por su frecuencia y/o gravedad:  '}
                            text={data.molestias_riesgos}
                        />
                        <TextCartaConsentimiento
                            title={'Beneficios esperados con su grado aproximado de probabilidad:  '}
                            text={data.beneficios_esperados}
                        />
                        <TextCartaConsentimiento
                            title={'Alternativas factibles: '}
                            text={data.alternativas_factibles}
                        />
                        <TextCartaConsentimiento
                            title={'Curso espontáneo del padecimiento sin tratamiento, y consecuencias de ello: '}
                            text={data.curso_espontaneo_padecimiento}
                        />
                        <TextCartaConsentimiento
                            title={'Opiniones y recomendaciones del estomatólogo: '}
                            text={data.opiniones_recomendaciones_estomatologo}
                        />
                    </article>
                </section>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="5" className="!border-none bg-cyan-700 text-white">DECLARACIÓN DEL PACIENTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <article className='flex flex-col border-b-transparent'>
                                    <p>Declaro que he sido informada/o satisfactoriamente de la naturaleza y propósito del procedimiento clínico bucal citado.</p>
                                    <p>Declaro que me han sido explicados verbalmente los posibles riesgos y complicaciones de dicho procedimiento clínico bucal, así como la existencia de otras alternativas de tratamiento. Además, he sido informado del tipo de anestesia y de los riesgos comúnmente conocidos que conlleva.</p>
                                    <p>El estomatólogo me ha explicado de otros problemas y complicaciones poco frecuentes, derivadas del tratamiento bucal que consiste en:</p>
                                </article>
                                <article>
                                    <div className='border border-black border-l-transparent border-r-transparent my-6 min-h-[3ch]'>{data.declaracion_paciente}</div>
                                </article>
                                <article>
                                    <p>Autorizo al estomatólogo para atención de contingencias y urgencias, derivadas del acto autorizado, atendiendo al principio de libertad de prescripción.</p>
                                </article>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                        <tr>
                            <th colSpan="5" className="!border-none bg-cyan-700 text-white">ACEPTACIÓN DEL PACIENTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <article className='flex flex-col border-b-transparent'>
                                    <p>Acepto y me comprometo a seguir responsablemente las recomendaciones recibidas, antes y después de la intervención, así como, acudir a las citas para las revisiones postoperatorias durante el tiempo indicado.</p>
                                    <p>Acepto y reconozco que no se me pueden dar garantías o seguridad absoluta respecto a que el resultado del procedimiento clínico-bucal sea el más satisfactorio, por lo que acepto la posibilidad de necesitar cualquier posterior intervención para mejorar el resultado final.</p>
                                    <p>
                                        Acepto firmar este consentimiento informado y manifiesto que el estomatólogo
                                        <span className='border-b border-black block min-h-[3ch]'>{data.aceptacion_paciente}</span>
                                        y/o su equipo de ayudantes me han informado del procedimiento clínico al que deseo ser sometida/o.
                                    </p>
                                </article>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <section className='my-10'>
                    <p className='mb-20'>Firmas:</p>
                    <div className='flex flex-col justify-center w-[60%] mx-auto gap-20'>
                        <p className='font-bold border-t border-black text-center'>Nombre y firma del paciente o del representante legal del paciente (según el caso)</p>
                        <p className='font-bold border-t border-black text-center'>Nombre y firma del estomatólogo tratante</p>
                        <p className='font-bold border-t border-black text-center'>Nombre y firma del testigo</p>
                    </div>
                </section>


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
