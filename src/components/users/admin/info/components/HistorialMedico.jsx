import React, { useEffect, useState } from 'react'
import TableHistorialMedico from './tables/TableHistorialMedico'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getUserInfoByID } from '../../../../../services/api';

export default function HistorialMedico() {

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
      console.log(response)
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
        <button
          className='rounded-md shadow-sm w-fit bg-slate-900 text-white cursor-pointer p-2'
          onClick={handleActivePopupCreate}
        >Crear</button>
      </section>
      <TableHistorialMedico data={fetchData}/>
    </div>
  )
}
