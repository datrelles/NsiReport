import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'

import { useReactToPrint } from "react-to-print";
import { useAuthContext } from '../../../../../../context/authContex';
import { useParams } from 'react-router-dom';
import { getUserInfoByID } from '../../../../../../services/api';
import { 
    DATA_TABLE_MedicalInformationRows,
    DATA_TABLE_ParentGuardianRows, 
    DATA_TABLE_PentalHealthAnswersRows,
    DATA_TABLE_Personal,
    DATA_TABLE_PersonalInformationRows
} from './dataTablePersonal';


export default function TableDatosPersonales() {

    const [personalInfoUser, setPersonalInfoUser] = useState(null);
    const { id } = useParams();
    const { jwt } = useAuthContext();
    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
        // onAfterPrint: ()=> alert("Data saved in PDF")
    });

    const renderTableCell = (value) => (value === null ? 'NULL' : value);

    useEffect(() => {
        const getDataTable = async () => {
            try {
                const response = await getUserInfoByID(jwt, id)
                setPersonalInfoUser(response)
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
        getDataTable();
    },[])


    

  return (
    <section className='w-full'>
        <button
            className='border shadow-sm rounded-md absolute right-10 top-6 ml-auto py-2 px-4 hover:bg-slate-500 hover:text-white'
            onClick={exportToPDF}
        >Exportar o Imprimir</button>
        

        {personalInfoUser ? 
            <div ref={tablesRef} className='p-10'>

                <table className='w-full my-4'>
                    <tbody>
                        <tr>
                        <ParamsTable
                            classNameTD='!border-none'
                            colSpan={5}
                            label=''
                            text={<img className='w-32 mx-20' src={Logo} alt='' />}
                        />
                        {Object.keys(DATA_TABLE_Personal).map((field) => (
                            <ParamsTable
                                key={field}
                                label={`${DATA_TABLE_Personal[field]}: `}
                                text={renderTableCell(personalInfoUser.personaldatatable[field])}
                            />
                        ))}
                        {/* <ParamsTable classNameTD='!border-none w-10' /> */}
                        </tr>
                    </tbody>
                </table>

                {/* <table className='w-full my-4'>
                    <tbody>
                        <tr>
                            <ParamsTable
                                classNameTD={'!border-none'}
                                colSpan={"5"}
                                label=''
                                text={
                                    <img className='w-32 mx-20' src={Logo} alt="" />
                                }
                            />
                            <ParamsTable
                                label='Alerta médica: '
                                text={personalInfoUser.personaldatatable.alerta_medica == null ? 'NULL' : personalInfoUser.personaldatatable.alerta_medica}
                            />
                            <ParamsTable
                                label='Condición: '
                                text={personalInfoUser.personaldatatable.condicion == null ? 'NULL' : personalInfoUser.personaldatatable.condicion}
                            />
                            <ParamsTable
                                label='Premedicación: '
                                text={personalInfoUser.personaldatatable.premedicacion == null ? 'NULL' : personalInfoUser.personaldatatable.premedicacion}
                            />
                            <ParamsTable
                                label='Alergias: '
                                text={personalInfoUser.personaldatatable.alergias == null ? 'NULL' : personalInfoUser.personaldatatable.alergias}
                            />
                            <ParamsTable
                                label='Anestesia: '
                                text={personalInfoUser.personaldatatable.anestesia == null ? 'NULL' : personalInfoUser.personaldatatable.anestesia}
                            />
                            <ParamsTable
                                classNameTD={'!border-none w-10'}
                            />
                            <ParamsTable
                                label='Fecha: '
                                text={personalInfoUser.personaldatatable.fecha == null ? 'NULL' : personalInfoUser.personaldatatable.fecha}
                            />
                        </tr>
                    </tbody>
                </table> */}

                {/* <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="5" className="!border-none bg-cyan-700 text-white">INFORMACIÓN PERSONAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <ParamsTable
                                colSpan={'2'}
                                label='Nombre: '
                                text={personalInfoUser.personalinformation.name ? personalInfoUser.personalinformation.name : 'NULL'}
                            />
                            <ParamsTable
                                label='Apellido paterno: '
                                text={personalInfoUser.personalinformation.paternal_last_name ? personalInfoUser.personalinformation.paternal_last_name : 'NULL'}
                            />
                            <ParamsTable
                                label='Apellido materno: '
                                text={personalInfoUser.personalinformation.maternal_last_name ? personalInfoUser.personalinformation.maternal_last_name : 'NULL'}
                            />
                            <ParamsTable
                                label='Tel. de trabajo: '
                                text={personalInfoUser.personalinformation.work_phone ? personalInfoUser.personalinformation.work_phone : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'2'}
                                label='Celular: '
                                text={personalInfoUser.personalinformation.cell_phone ? personalInfoUser.personalinformation.cell_phone : 'NULL'}
                            />
                            <ParamsTable
                                colSpan={'3'}
                                label='Correo electrónico: '
                                text={personalInfoUser.personalinformation.email ? personalInfoUser.personalinformation.email : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                label='Edad: '
                                text={personalInfoUser.personalinformation.age ? personalInfoUser.personalinformation.age : 'NULL'}
                            />
                            <ParamsTable
                                label='Fecha de nacimiento: '
                                text={personalInfoUser.personalinformation.date_of_birth ? personalInfoUser.personalinformation.date_of_birth : 'NULL'}
                            />
                            <ParamsTable
                                label='Estatura: '
                                text={personalInfoUser.personalinformation.height_cm ? personalInfoUser.personalinformation.height_cm : 'NULL'}
                            />
                            <ParamsTable
                                label='Peso: '
                                text={personalInfoUser.personalinformation.weight_kg ? personalInfoUser.personalinformation.weight_kg : 'NULL'}
                            />
                            <ParamsTable
                                label='Genero: '
                                text={personalInfoUser.personalinformation.gender ? personalInfoUser.personalinformation.gender : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'2'}
                                label='Nacionalidad: '
                                text={personalInfoUser.personalinformation.nationality ? personalInfoUser.personalinformation.nationality : 'NULL'}
                            />
                            <ParamsTable
                                label='Estado civil: '
                                text={personalInfoUser.personalinformation.marital_status ? personalInfoUser.personalinformation.marital_status : 'NULL'}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='Ocupación: '
                                text={personalInfoUser.personalinformation.occupation ? personalInfoUser.personalinformation.occupation : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'3'}
                                label='Dirección: '
                                text={personalInfoUser.personalinformation.address ? personalInfoUser.personalinformation.address : 'NULL'}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='Código postal: '
                                text={personalInfoUser.personalinformation.postal_code ? personalInfoUser.personalinformation.postal_code : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'3'}
                                label='Contacto en caso de emergencia: '
                                text={personalInfoUser.personalinformation.emergency_contact ? personalInfoUser.personalinformation.emergency_contact : 'NULL'}
                            />
                            <ParamsTable
                                label='Parentesco: '
                                text={personalInfoUser.personalinformation.relationship ? personalInfoUser.personalinformation.relationship : 'NULL'}
                            />
                            <ParamsTable
                                label='Telefono: '
                                text={personalInfoUser.personalinformation.emergency_phone ? personalInfoUser.personalinformation.emergency_phone : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'5'}
                                label='Teléfono y dirección de su servicio médico en caso de urgencia:  '
                                text={personalInfoUser.personalinformation.emergency_medical_service ? personalInfoUser.personalinformation.emergency_medical_service : 'NULL'}
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'5'}
                                label='Aseguranza:  '
                                text={personalInfoUser.personalinformation.insurance ? personalInfoUser.personalinformation.insurance : 'NULL'}
                            />
                        </tr>
                    </tbody>
                </table> */}

                <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="5" className="!border-none bg-cyan-700 text-white">INFORMACIÓN PERSONAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA_TABLE_PersonalInformationRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((field, colIndex) => (
                                    <ParamsTable
                                        key={colIndex}
                                        colSpan={`${field.colSpan}`}
                                        label={`${field.label}: `}
                                        text={personalInfoUser.personalinformation[field.field] || 'NULL'}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="5" className="!border-none bg-cyan-700 text-white">PADRE O TUTOR DEL PACIENTE (SI EL PACIENTE ES MENOR DE 18 AÑOS DE EDAD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <ParamsTable
                                label='Nombre: '
                                text='Dylan Steven'
                            />
                            <ParamsTable
                                label='Apellido paterno: '
                                text='España'
                            />
                            <ParamsTable
                                label='Apellido materno: '
                                text='Cervantes'
                            />
                            <ParamsTable
                                label='Edad: '
                                text='45'
                            />
                            <ParamsTable
                                label='Parentesco: '
                                text='NULL'
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'2'}
                                label='Celular: '
                                text='0997237902'
                            />
                            <ParamsTable
                                colSpan={'3'}
                                label='Correo electrónico: '
                                text='dylan@example.com'
                            />
                        </tr>
                        <tr>
                            <ParamsTable
                                colSpan={'3'}
                                label='Dirección: '
                                text='Voluntad de Dios'
                            />
                            <ParamsTable
                                label='Ciudad: '
                                text='Esmeraldas'
                            />
                            <ParamsTable
                                label='Código postal: '
                                text='08014115'
                            />
                        </tr>
                    </tbody>
                </table> */}

                <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                        <th colSpan="5" className="!border-none bg-cyan-700 text-white">
                            PADRE O TUTOR DEL PACIENTE (SI EL PACIENTE ES MENOR DE 18 AÑOS DE EDAD)
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA_TABLE_ParentGuardianRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((field, colIndex) => (
                            <ParamsTable
                                key={colIndex}
                                colSpan={field.colSpan}
                                label={`${field.label}: `}
                                text={personalInfoUser.parentorguardianofpatient[field.field] || 'NULL'}
                            />
                            ))}
                        </tr>
                        ))}
                    </tbody>
                </table>

                <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            {/* colSpan="4" indica que el encabezado debe ocupar 4 columnas */}
                            <th colSpan="4" className="!border-none bg-cyan-700 text-white">INFORMACIÓN DENTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA_TABLE_PentalHealthAnswersRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((field, colIndex) => (
                                    <>
                                        {field.typeComponent == 'Option' ? 
                                            <ParamsTableOptions
                                                key={colIndex}
                                                label={`${field.label} `}
                                                selectedOption={personalInfoUser.dentalhealthanswers[field.field]}
                                            />
                                            :
                                            <ParamsTable
                                                key={colIndex}
                                                colSpan={field.colSpan}
                                                label={`${field.label} `}
                                                text={personalInfoUser.dentalhealthanswers[field.field] || 'NULL'}
                                            />
                                        }
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="4" className="!border-none bg-cyan-700 text-white">INFORMACIÓN DENTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <ParamsTableOptions
                                label='¿Le sangran sus encías al cepillarse?'
                                selectedOption={personalInfoUser.dentalhealthanswers.sangrado_encias == null ? 'NULL' : personalInfoUser.dentalhealthanswers.sangrado_encias}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='¿Cuál es el motivo de su consulta?'
                                text={personalInfoUser.dentalhealthanswers.motivo_consulta == null ? 'NULL' : personalInfoUser.dentalhealthanswers.motivo_consulta}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Ha recibido tratamiento periodontal (de las encías)?'
                                selectedOption={personalInfoUser.dentalhealthanswers.tratamiento_periodontal == null ? 'NULL' : personalInfoUser.dentalhealthanswers.tratamiento_periodontal}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='Fecha de su última consulta dental: '
                                text={personalInfoUser.dentalhealthanswers.fecha_ultima_consulta == null ? 'NULL' : personalInfoUser.dentalhealthanswers.fecha_ultima_consulta}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Ha recibido tratamiento de ortodoncia (frenos)?'
                                selectedOption={personalInfoUser.dentalhealthanswers.tratamiento_ortodoncia == null ? 'NULL' : personalInfoUser.dentalhealthanswers.tratamiento_ortodoncia}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='¿Cuál fue el tratamiento que le hicieron esa vez?'
                                text={personalInfoUser.dentalhealthanswers.tratamiento_anterior == null ? 'NULL' : personalInfoUser.dentalhealthanswers.tratamiento_anterior}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Tiene dientes sensibles al frío, calor, dulce o a la presion?'
                                selectedOption={personalInfoUser.dentalhealthanswers.dientes_sensibles == null ? 'NULL' : personalInfoUser.dentalhealthanswers.dientes_sensibles}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='Fecha de sus últimos rayos X dentales:'
                                text={personalInfoUser.dentalhealthanswers.fecha_ultimos_rayos_x == null ? 'NULL' : personalInfoUser.dentalhealthanswers.fecha_ultimos_rayos_x}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Siente flojo alguno de sus dientes?'
                                selectedOption={personalInfoUser.dentalhealthanswers.dientes_flojos == null ? 'NULL' : personalInfoUser.dentalhealthanswers.dientes_flojos}
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='¿Cuántas veces al día cepilla sus dientes?'
                                text={personalInfoUser.dentalhealthanswers.veces_cepillado_diario == null ? 'NULL' : personalInfoUser.dentalhealthanswers.veces_cepillado_diario}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Tiene dolor de oído o de cuello?'
                                selectedOption={personalInfoUser.dentalhealthanswers.dolor_oido_o_cuello == null ? 'NULL' : personalInfoUser.dentalhealthanswers.dolor_oido_o_cuello}
                            />
                            <ParamsTableOptions
                                label='¿Usa el hilo dental?'
                                selectedOption={personalInfoUser.dentalhealthanswers.usa_hilo_dental == null ? 'NULL' : personalInfoUser.dentalhealthanswers.usa_hilo_dental}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Usa prótesis dentales removibles (aparatos)?'
                                selectedOption={personalInfoUser.dentalhealthanswers.usa_dentadura == null ? 'NULL' : personalInfoUser.dentalhealthanswers.usa_dentadura}
                            />
                            <ParamsTableOptions
                                label='¿Anteriormente le han enseñado la técnica de cepillado y de uso del hilo dental?'
                                selectedOption={personalInfoUser.dentalhealthanswers.tecnica_cepillado_hilo_dental_ensenada == null ? 'NULL' : personalInfoUser.dentalhealthanswers.tecnica_cepillado_hilo_dental_ensenada}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Ha tenido alguna experiencia desagradable en tratamientos dentales recibidos anteriormente? ¿cuál?'
                                selectedOption={personalInfoUser.dentalhealthanswers.experiencia_dental_desagradable == null ? 'NULL' : personalInfoUser.dentalhealthanswers.experiencia_dental_desagradable}
                                text={personalInfoUser.dentalhealthanswers.descripcion_experiencia_desagradable == null ? 'NULL' : personalInfoUser.dentalhealthanswers.descripcion_experiencia_desagradable}
                            />
                        </tr>
                    </tbody>
                </table> */}

                {/* <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="4" className="!border-none bg-cyan-700 text-white">INFORMACIÓN MÉDICA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td colSpan="4" >¿Tiene o ha tenido alguna de las siguientes enfermedades o problemas? </td>
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='Tuberculosis activa'
                            />
                            <ParamsTableOptions
                                label='¿Tiene buen estado de salud general? '
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='Tos persistente por más de tres semanas'
                            />
                            <ParamsTableOptions
                                label='¿Toma o ha tomado algún medicamento recientemente? ¿Cuál? ¿Para qué lo toma? '
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='Tos que produce sangre'
                            />
                            <ParamsTableOptions
                                label='¿Le ha recomendado el médico o dentista anterior que tome antibiótico antes de recibir tratamiento dental?'
                                text={''}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Toma bebidas alcohólicas?'
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='¿Qué antibiótico y qué dosis?  '
                                text={''}
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Fuma?'
                            />
                            <ParamsTableOptions
                                label='¿Ha sido hospitalizado en los dos últimos años? '
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Usa drogas? '
                            />
                            <ParamsTableOptions
                                label='¿Le han reemplazado alguna articulación (cadera, rodilla, codo, dedo)?'
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Tiene dependencia al alcohol o drogas? '
                            />
                            <td colSpan={'2'} className='bg-red-400 text-white text-center font-medium'>PARA MUJERES ÚNICAMENTE</td>
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Ha cambiado su salud durante los dos años pasados? '
                            />
                            <ParamsTableOptions
                                label='¿Está o pudiera estar embarazada?'
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Actualmente se encuentra bajo tratamiento médico?'
                            />
                            <ParamsTableOptions
                                label='¿Está amamantando?'
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿De qué enfermedad está siendo tratado?'
                            />
                            <ParamsTableOptions
                                label='¿Está tomando anticonceptivos u hormonas?'
                            />
                        </tr>
                        <tr>
                            <ParamsTableOptions
                                label='¿Padece alguna alergia o es alérgico a algún medicamento, aspirina, penicilina, anestésico, látex, metal, alimento o cualquier otra sustancia? ¿Especifique a cuál y el tipo de reacción?'
                            />
                            <ParamsTable
                                colSpan={'2'}
                                label='¿Cuál?'
                                text={'NULL'}
                            />
                        </tr>
                    </tbody>
                </table> */}

                <table className='w-full my-4'>
                    <thead className='!border-none'>
                        <tr className='!border-none'>
                            <th colSpan="4" className="!border-none bg-cyan-700 text-white">INFORMACIÓN MÉDICA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td colSpan="4" >¿Tiene o ha tenido alguna de las siguientes enfermedades o problemas? </td>
                        </tr>
                        {DATA_TABLE_MedicalInformationRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((field, colIndex) => (
                                    <>
                                        {field.typeComponent == 'Option' ?
                                            <ParamsTableOptions
                                                key={colIndex}
                                                label={`${field.label} `}
                                                selectedOption={personalInfoUser.medicalinformation[field.field]}
                                            />
                                        : field.typeComponent == 'Subtitle' ?
                                            <td colSpan={'2'} className='bg-red-400 text-white text-center font-medium'>{field.label}</td>
                                        :
                                            <ParamsTable
                                                key={colIndex}
                                                colSpan={field.colSpan}
                                                label={`${field.label} `}
                                                text={personalInfoUser.medicalinformation[field.field] || 'NULL'}
                                            />
                                        }
                                    </>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        : ''}
        

    </section>
  )
}


function ParamsTable({label, text, classNameTD, colSpan, rowSpan}) {
    return (
        <td className={`p-1 ${classNameTD}`} rowSpan={rowSpan} colSpan={colSpan} >
            <h4 className='text-xs font-medium text-gray-900'>{label}</h4>
            <p className='text-sm mb-auto'>{text}</p>
        </td>
    )
}

function ParamsTableOptions({label, text, selectedOption, classNameTD, colSpan}) {

    const options = ['Si', 'No', 'No Sé'];
    options.map((option, index) => (
        console.log(selectedOption === option.toLowerCase())
    ))
    


    return (
        <>
            <td className={`gap-5 !border-nones p-1 ${classNameTD}`} colSpan={colSpan} >
                <h4 className=' text-xs font-medium text-gray-900'>{label}</h4>
                <p className='text-sm mb-auto'>{text}</p>
            </td>
            <td className='p-2 w-[10%]'>
                <div className='flex gap-2 justify-center items-center'>
                    {options.map((option, index) => (
                        <div key={index} className='flex flex-col items-center justify-between'>
                        <h6 className='text-xs'>{option}</h6>
                        <div className={`border w-4 h-4 text-xs flex items-center justify-center text-gray-700`}>{selectedOption === option.toLowerCase() ? 'X' : ''}</div>
                        </div>
                    ))}
                </div>
            </td>
        </>
    )
}
