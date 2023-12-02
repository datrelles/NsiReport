import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../../common/inputs/Input'
import PopupForms from './PopupForms'
import {
  InputsDentalInformation,
  InputsInfoPersonal,
  InputsMedicalInformationQuestions,
  InputsMedicalInformationQuestionsMujeres,
  InputsPricipalData,
  InputsTutorData
} from '../../../../../data/datosPersonales'
import TableDatosPersonales from './tables/TableDatosPersonales';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getUserInfoByID, putInfoPersonalUser } from '../../../../../services/api';
import ButtonDownloadFile from './Buttons/ButtonDownloadFile';
import ButtonCreate from './Buttons/ButtonCreate';

export default function DatosPersonales() {

  const [fetchData, setFetchData] = useState(null);
  const [activePopupCreate, setActivePopupCreate] = useState(false);
  const [principalData, setPrincipalData] = useState(true);
  const [personalInformation, setPersonalInformation] = useState(false);
  const [guardianOfPatient, setGuardianOfPatient] = useState(false);
  const [dentalInformation, setDentalInformation] = useState(false);
  const [medicalInformation, setMedicalInformation] = useState(false);
  const [buttonSend, setButtonSend] = useState(false);
  
  const { id } = useParams();
  const { jwt } = useAuthContext();

  // Función para manejar cambios en los campos.
  const handleInputChange = (table, e) => {
    const { name, value } = e.target;
    setFetchData({
      ...fetchData,
      [table]: {
        ...fetchData[table],
        [name]: value || null,
      },
    });
  };
  
  const handleActivePopupCreate = () => {
    setActivePopupCreate(true);
  }
  const handleDesactivePopupCreate = () => {
    setActivePopupCreate(false);
    // Reinicar el el formulario
    setPrincipalData(true);
    setPersonalInformation(false);
    setGuardianOfPatient(false);
    setDentalInformation(false);
    setMedicalInformation(false);
    setButtonSend(false);
  }
  const handleNextPopupCreate = () => {
    switch (true) {
      case principalData:
        setPrincipalData(false);
        setPersonalInformation(true);
        break;
      case personalInformation:
        setPersonalInformation(false);
        if (true) {
          setGuardianOfPatient(true);
        }else {
          setDentalInformation(true);
        }
        break;
      case guardianOfPatient:
        setGuardianOfPatient(false);
        setDentalInformation(true);
        break;
      case dentalInformation:
        setDentalInformation(false);
        setMedicalInformation(true);
        setButtonSend(true);
        break;
      default:
        break;
    }
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await putInfoPersonalUser(jwt, fetchData, id);
      handleDesactivePopupCreate();
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getDataTable = async () => {
        try {
          const response = await getUserInfoByID(jwt, id)
          setFetchData(response);
        } catch (error) {
          console.error(error)
        }
    }
    getDataTable();
  },[])


  return (
    <div className='pt-6 relative'>
      <section className='flex flex-row gap-10 px-10'>
        <ButtonCreate onClick={handleActivePopupCreate} />
        <ButtonDownloadFile category={'Datos Personales'} />
      </section>

      {fetchData && <TableDatosPersonales data={fetchData} />}

      <PopupForms
        active={activePopupCreate}
        onClickClose={handleDesactivePopupCreate}
      >
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <h1 className='text-lg font-bold mb-5'>{`
                Datos personales 
                ${personalInformation ? '(Informacion Personal)' : ''}
                ${guardianOfPatient ? '(Tutor del paciente)' : ''}
                ${dentalInformation ? '(Informacion Dental)' : ''}
                ${medicalInformation ? '(Informacion Medica)' : ''}
              `}</h1>
              

              {fetchData ?
                <React.Fragment>
                    <div className={`${!principalData ? 'hidden': ''}`}>
                      {InputsPricipalData.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.personaldatatable[data.name]}
                            onChange={(e) => handleInputChange("personaldatatable", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!personalInformation ? 'hidden': ''}`}>
                      {InputsInfoPersonal.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.personalinformation[data.name]}
                            onChange={(e) => handleInputChange("personalinformation", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!guardianOfPatient ? 'hidden': ''}`}>
                      {InputsTutorData.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.parentorguardianofpatient[data.name]}
                            onChange={(e) => handleInputChange("parentorguardianofpatient", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!dentalInformation ? 'hidden': ''}`}>
                      {InputsDentalInformation.map((data, index)=>(
                        <Input
                          key={index}
                          label={data.label}
                          type={data.type}
                          id={data.id}
                          name={data.name}
                          placeholder={data.placeholder}
                          value={fetchData.dentalhealthanswers[data.name]}
                          onChange={(e) => handleInputChange("dentalhealthanswers", e)}
                        />
                      ))}
                    </div>
                    <div className={`${!medicalInformation ? 'hidden': ''}`}>
                      {InputsMedicalInformationQuestions.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.medicalinformation[data.name]}
                            onChange={(e) => handleInputChange("medicalinformation", e)}
                          />
                      ))}
                      <h2 className='font-bold mt-5'>PARA MUJERES ÚNICAMENTE</h2>
                      {InputsMedicalInformationQuestionsMujeres.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.medicalinformation[data.name]}
                            onChange={(e) => handleInputChange("medicalinformation", e)}
                          />
                      ))}
                    </div>
                </React.Fragment>
              : ''}


              <div className='flex flex-row w-full gap-5 mt-6'>
                <button
                  className='border rounded-md w-full py-2 px-4 text-white font-semibold bg-green-500 hover:bg-green-600'
                  type="submit"
                >Guardar</button>
                {!buttonSend &&
                  <button
                    className='border rounded-md w-full py-2 px-4 text-white font-semibold bg-cyan-500 hover:bg-cyan-600'
                    type="button"
                    onClick={handleNextPopupCreate}
                  >Siguiente</button>
                }
              </div>
          </form>
      </PopupForms>
    </div>
  )
}