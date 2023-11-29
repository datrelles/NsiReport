import React, { useEffect, useState } from 'react'
import TableHistorialMedico from './tables/TableHistorialMedico'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getHistorialMedicoUserByID, putHistorialMedicoUser } from '../../../../../services/api';
import PopupForms from './PopupForms';
import Input from '../../../../common/inputs/Input';
import { Inputs_DentistaHistorialMedico, Inputs_HistorialMedico } from '../../../../../data/inputsHistorialMedico';
import ButtonCreate from './Buttons/ButtonCreate';
import ButtonDownloadFile from './Buttons/ButtonDownloadFile';

export default function HistorialMedico() {

  const [fetchData, setFetchData] = useState(null);
  const [activePopupCreate, setActivePopupCreate] = useState(false);
  
  const [principalDataHistorialMedico, setPrincipalDataHistorialMedico] = useState(true);
  const [dentistaHistorialMedico, setDentistaHistorialMedico] = useState(false);
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
    setPrincipalDataHistorialMedico(true);
    setDentistaHistorialMedico(false);
    setButtonSend(false);
  }
  const handleNextPopupCreate = () => {
    switch (true) {
      case principalDataHistorialMedico:
        setPrincipalDataHistorialMedico(false);
        setDentistaHistorialMedico(true);
        setButtonSend(true);
        break;
      default:
        break;
    }
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await putHistorialMedicoUser(jwt, fetchData, id);
      handleDesactivePopupCreate();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getDataTable = async () => {
        try {
          const response = await getHistorialMedicoUserByID(jwt, id)
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
        <ButtonDownloadFile category={'Historial Medico'} />
      </section>

      {fetchData && <TableHistorialMedico data={fetchData} />}

      <PopupForms
        active={activePopupCreate}
        onClickClose={handleDesactivePopupCreate}
      >
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <h1 className='text-lg font-bold mb-5'>{`
                Historial Medico
                ${dentistaHistorialMedico ? '(Para uso del Dentista)' : ''}
              `}</h1>
              

              {fetchData ?
                <React.Fragment>
                    <div className={`${!principalDataHistorialMedico ? 'hidden': ''}`}>
                      {Inputs_HistorialMedico.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.historial_medico[data.name]}
                            onChange={(e) => handleInputChange("historial_medico", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!dentistaHistorialMedico ? 'hidden': ''}`}>
                      {Inputs_DentistaHistorialMedico.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.dentistahistorialmedico[data.name]}
                            onChange={(e) => handleInputChange("dentistahistorialmedico", e)}
                          />
                      ))}
                    </div>
                </React.Fragment>
              : ''}


              <div className='flex flex-row w-full gap-5 mt-6'>
                <button
                  className='border rounded-md w-full py-2 px-4 text-white font-semibold bg-green-500 hover:bg-green-600'
                  type="submit"
                  // onClick={handleDesactivePopupCreate}
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
