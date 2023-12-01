import React, { useEffect, useState } from 'react'
import TableHistorialMedico from './tables/TableHistorialMedico'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getCartaConsentimentoById, getDiagnosticoDentalById, putCartaConsentimentoById, putDiagnosticoDentalById, putHistorialMedicoUser } from '../../../../../services/api';
import PopupForms from './PopupForms';
import Input from '../../../../common/inputs/Input';
import ButtonCreate from './Buttons/ButtonCreate';
import ButtonDownloadFile from './Buttons/ButtonDownloadFile';
import TableDiagnostico from './tables/TableDiagnostico';
import { Inputs_DiagnosticoGeneral, Inputs_DiagnosticoTratamientoAdicional } from '../../../../../data/inputsDiagnosticoDental';
import TableCartaConsentimiento from './tables/TableCartaConsentimiento';
import { Inputs_Consentimiento } from '../../../../../data/inputsConsentimiento';

export default function CartaConsentimiento() {

  const [fetchData, setFetchData] = useState(null);
  const [activePopupCreate, setActivePopupCreate] = useState(false);
  
  const { id } = useParams();
  const { jwt } = useAuthContext();

  // Función para manejar cambios en los campos.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFetchData({
      ...fetchData,
        [name]: value || null,
    });
  };
  const handleInputChangeInputArray = (table, e) => {
    const { name, value } = e.target;
    setFetchData({
      ...fetchData,
        [table]: {
          ...fetchData[table],
          [name]: value || null,
        }
    });
  };
  
  const handleActivePopupCreate = () => {
    setActivePopupCreate(true);
  }
  const handleDesactivePopupCreate = () => {
    setActivePopupCreate(false);
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await putCartaConsentimentoById(jwt, fetchData, id);
      // console.log(response)
      handleDesactivePopupCreate();
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getDataTable = async () => {
        try {
          const response = await getCartaConsentimentoById(id)
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

      {fetchData && <TableCartaConsentimiento data={fetchData} />}

      <PopupForms
        active={activePopupCreate}
        onClickClose={handleDesactivePopupCreate}
      >
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <h1 className='text-lg font-bold mb-5'>{`
                CARTA DE CONSENTIMIENTO Y ACEPTACIÓN
              `}</h1>
              
              {fetchData ?
                <React.Fragment>
                    <div className={``}>
                      <article>
                        <label htmlFor="" className='font-medium'>Direccion: </label>
                        <p>
                          Tijuana. Baja California a
                          <input
                            className='w-20 border-b mx-2'
                            type="text"
                            name='part1'
                            id='part1'
                            value={fetchData.direccion.part1}
                            onChange={(e)=>handleInputChangeInputArray('direccion', e)}
                          />
                          de
                          <input
                            className='w-20 border-b mx-2'
                            type="text"
                            name='part2'
                            id='part2'
                            value={fetchData.direccion.part2}
                            onChange={(e)=>handleInputChangeInputArray('direccion', e)}
                          />
                          de 20
                          <input
                            className='w-20 border-b mx-2'
                            type="text"
                            name='part3'
                            id='part3'
                            value={fetchData.direccion.part3}
                            onChange={(e)=>handleInputChangeInputArray('direccion', e)}
                          />
                        </p>
                      </article>
                      {Inputs_Consentimiento.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData[data.name]}
                            onChange={handleInputChange}
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
              </div>
          </form>
      </PopupForms>

    </div>
  )
}
