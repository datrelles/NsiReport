import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../../../../assets/logo.png'

import { useReactToPrint } from "react-to-print";
import { 
    DATA_TABLE_MedicalInformationRows,
    DATA_TABLE_ParentGuardianRows, 
    DATA_TABLE_PentalHealthAnswersRows,
    DATA_TABLE_PersonalInformationRows,
    DATA_TABLE_PersonalRows
} from './dataTablePersonal';

import { ParamsTable, ParamsTableOptions } from '../TDsTables';
import ButtonImprimir from '../Buttons/ButtonImprimir';


export default function TableDatosPersonales({data}) {

    const [personalInfoUser, setPersonalInfoUser] = useState(null);
    const tablesRef = useRef(null);

    const exportToPDF = useReactToPrint({
        content: ()=>  tablesRef.current,
        documentTitle: "textPDF",
        // onAfterPrint: ()=> alert("Data saved in PDF")
    });

    useEffect(() => {
        setPersonalInfoUser(data)
    },[data])
    
  return (
    <section className='w-full'>
        <ButtonImprimir onClick={exportToPDF} />

        {personalInfoUser !== null ? 
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
                            {DATA_TABLE_PersonalRows.map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    {row.map((field, colIndex) => (
                                        <ParamsTable
                                            key={colIndex}
                                            colSpan={`${field.colSpan}`}
                                            label={`${field.label}: `}
                                            text={personalInfoUser.personaldatatable[field.field] || 'NULL'}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </tr>
                    </tbody>
                </table>

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
                            <th colSpan="4" className="!border-none bg-cyan-700 text-white">INFORMACIÓN DENTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA_TABLE_PentalHealthAnswersRows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((field, colIndex) => (
                                    <React.Fragment key={colIndex}>
                                        {field.typeComponent == 'Option' ? 
                                            <ParamsTableOptions
                                                // key={colIndex}
                                                label={`${field.label} `}
                                                selectedOption={personalInfoUser.dentalhealthanswers[field.field]}
                                            />
                                            :
                                            <ParamsTable
                                                // key={colIndex}
                                                colSpan={field.colSpan}
                                                label={`${field.label} `}
                                                text={personalInfoUser.dentalhealthanswers[field.field] || 'NULL'}
                                            />
                                        }
                                    </React.Fragment>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

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
                                    <React.Fragment key={colIndex}>
                                        {field.typeComponent == 'Option' ?
                                            <ParamsTableOptions
                                                // key={colIndex}
                                                label={`${field.label} `}
                                                selectedOption={personalInfoUser.medicalinformation[field.field]}
                                            />
                                        : field.typeComponent == 'Subtitle' ?
                                            <td colSpan={'2'} className='bg-red-400 text-white text-center font-medium'>{field.label}</td>
                                        :
                                            <ParamsTable
                                                // key={colIndex}
                                                colSpan={field.colSpan}
                                                label={`${field.label} `}
                                                text={personalInfoUser.medicalinformation[field.field] || 'NULL'}
                                            />
                                        }
                                    </React.Fragment>
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
