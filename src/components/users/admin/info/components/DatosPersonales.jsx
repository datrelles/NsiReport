import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../../common/inputs/Input'
import PopupForms from './PopupForms'
import { InputsDentalInformation, InputsInfoPersonal, InputsMedicalInformationQuestions, InputsMedicalInformationQuestionsMujeres, InputsPricipalData, InputsTutorData } from '../../../../../data/datosPersonales'
import TableDatosPersonales from './tables/TableDatosPersonales';

export default function DatosPersonales() {

  const initialData = {
    alertaMedica: '',
    condicion: '',
    premedicacion: '',
    alergias: '',
    anestesia: '',
    fecha: '',
  };

  const [formData, setFormData] = useState(initialData);

  // Función para manejar cambios en los campos.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const [activePopupCreate, setActivePopupCreate] = useState(false);
  
  const [principalData, setPrincipalData] = useState(true);
  const [personalInformation, setPersonalInformation] = useState(false);
  const [guardianOfPatient, setGuardianOfPatient] = useState(false);
  const [dentalInformation, setDentalInformation] = useState(false);
  const [medicalInformation, setMedicalInformation] = useState(false);

  const [buttonSend, setButtonSend] = useState(false);

  
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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // Simulación de carga de datos desde la base de datos.
    const fetchedData = {
      alertaMedica: 'Dato de alerta médica',
      condicion: 'Dato de condición',
      premedicacion: 'Dato de premedicación',
      alergias: 'Dato de alergias',
      anestesia: 'Dato de anestesia',
      fecha: '2023-01-01',
    };

    setFormData(fetchedData);
  }, []);
  

  return (
    <div className='pt-6 relative'>
      <section className='flex flex-row gap-10 px-10'>
        <button
          className='rounded-md shadow-sm w-fit bg-slate-900 text-white cursor-pointer p-2'
          onClick={handleActivePopupCreate}
        >Crear</button>
      </section>

      <TableDatosPersonales />

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
              {principalData && 
                <>
                  {InputsPricipalData.map((data, index)=>(
                      <Input
                        key={index}
                        label={data.label}
                        type={data.type}
                        id={data.id}
                        name={data.name}
                        placeholder={data.placeholder}
                        value={formData[data.name]}
                        onChange={handleInputChange}
                      />
                  ))}
                </>
              }
              {personalInformation && 
                <>
                  {InputsInfoPersonal.map((data, index)=>(
                      <Input
                        key={index}
                        type={data.type}
                        id={data.id}
                        name={data.name}
                        placeholder={data.placeholder}
                        label={data.label}
                      />
                  ))}
                </>
              }
              {guardianOfPatient && 
                <>
                  {InputsTutorData.map((data, index)=>(
                      <Input
                        key={index}
                        type={data.type}
                        id={data.id}
                        name={data.name}
                        placeholder={data.placeholder}
                        label={data.label}
                      />
                  ))}
                </>
              }
              {dentalInformation && 
                <>
                  {InputsDentalInformation.map((data, index)=>(
                    <Input
                      key={index}
                      type={data.type}
                      id={data.id}
                      name={data.name}
                      placeholder={data.placeholder}
                      label={data.label}
                    />
                  ))}
                </>
              }
              {medicalInformation && 
                <>
                  {InputsMedicalInformationQuestions.map((data, index)=>(
                      <Input
                        key={index}
                        type={data.type}
                        id={data.id}
                        name={data.name}
                        placeholder={data.placeholder}
                        label={data.label}
                      />
                  ))}
                  <h2 className='font-bold mt-5'>PARA MUJERES ÚNICAMENTE</h2>
                  {InputsMedicalInformationQuestionsMujeres.map((data, index)=>(
                      <Input
                        key={index}
                        type={data.type}
                        id={data.id}
                        name={data.name}
                        placeholder={data.placeholder}
                        label={data.label}
                      />
                  ))}
                </>
              }


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
