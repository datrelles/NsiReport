import React, { useEffect, useState } from 'react'
import TableHistorialMedico from './tables/TableHistorialMedico'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getDiagnosticoDentalById, getTratamientoEndodonciaById, putDiagnosticoDentalById, putHistorialMedicoUser, putTratamientoEndodonciaById } from '../../../../../services/api';
import PopupForms from './PopupForms';
import Input from '../../../../common/inputs/Input';
import ButtonCreate from './Buttons/ButtonCreate';
import ButtonDownloadFile from './Buttons/ButtonDownloadFile';
import TableTratamientoEndodoncia from './tables/TableTratamientoEndodoncia';
import { Inputs_EndodonciaDiagnostico, Inputs_EndodonciaGeneral, Inputs_TratamientoEndodoncia_Padre } from '../../../../../data/inputsTratamientoEndodoncia';

export default function TratamientoEndodoncia() {

  const [fetchData, setFetchData] = useState(null);
  const [activePopupCreate, setActivePopupCreate] = useState(false);
  
  const [endodonciaGeneral, setEndodonciaGeneral] = useState(true);
  const [endodonciaDatosExamen, setEndodonciaDatosExamen] = useState(false);
  const [endodonciaDiagnostico, setEndodonciaDiagnostico] = useState(false);
  const [endodonciaTratamiento, setEndodonciaTratamiento] = useState(false);

  const [dataEndodonciaDatosExamen, setDataEndodonciaDatosExamen] = useState(false);
  

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
  const handleInputChangeArray = (index, fieldName, value) => {
    // Clonar el array para no modificar el estado directamente
    const newData = [...fetchData.tratamiento_endodoncia_datos_del_examen];

    // Actualizar el campo específico
    newData[index][fieldName] = value;

    // Actualizar el estado
    setDataEndodonciaDatosExamen(newData);
  };


  const handleActivePopupCreate = () => {
    setActivePopupCreate(true);
  }
  const handleDesactivePopupCreate = () => {
    setActivePopupCreate(false);

    // Reinicar el el formulario
    setEndodonciaGeneral(true);
    setEndodonciaDatosExamen(false);
    setEndodonciaDiagnostico(false);
    setEndodonciaTratamiento(false);
    
    setButtonSend(false);
  }
  const handleNextPopupCreate = () => {
    switch (true) {
      case endodonciaGeneral:
        setEndodonciaGeneral(false);
        setEndodonciaDatosExamen(true);
        break;
      case endodonciaDatosExamen:
        setEndodonciaDatosExamen(false);
        setEndodonciaDiagnostico(true);
        break;
      case endodonciaDiagnostico:
        setEndodonciaDiagnostico(false);
        setEndodonciaTratamiento(true);
        setButtonSend(true);
        break;
      default:
        break;
    }
    
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const response = await putTratamientoEndodonciaById(jwt, fetchData, id);
      console.log(response)
      handleDesactivePopupCreate();
      window.location.reload();
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getDataTable = async () => {
        try {
          const response = await getTratamientoEndodonciaById(id)
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

      {fetchData && <TableTratamientoEndodoncia data={fetchData} />}

      <PopupForms
        active={activePopupCreate}
        onClickClose={handleDesactivePopupCreate}
      >
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <h1 className='text-lg font-bold mb-5'>{`
                Endodoncia
                ${endodonciaDatosExamen ? '(DATOS DEL EXAMEN)' : ''}
                ${endodonciaDiagnostico ? '(DIAGNOSTICO)' : ''}
                ${endodonciaTratamiento ? '(DATOS GENERALES DEL TRATAMIENTO)' : ''}
              `}</h1>
              
              {fetchData ?
                <React.Fragment>
                    <div className={`${!endodonciaGeneral ? 'hidden': ''}`}>
                      {Inputs_EndodonciaGeneral.map((data, index)=>(
                        <Input
                          key={index}
                          label={data.label}
                          type={data.type}
                          id={data.id}
                          name={data.name}
                          placeholder={data.placeholder}
                          value={fetchData.tratamiento_endodoncia_general[data.name]}
                          onChange={(e) => handleInputChange("tratamiento_endodoncia_general", e)}
                        />
                      ))}
                    </div>
                    <div className={`${!endodonciaDatosExamen ? 'hidden': ''}`}>
                      {fetchData.tratamiento_endodoncia_datos_del_examen.map((data, index)=>(
                        <div className='flex flex-col gap-2 mt-5' key={index}>
                          <label htmlFor="" className='font-semibold'>{data.label}</label>
                          <input
                            className='border-b'
                            type="text"
                            name={`option_${data.name}`}
                            placeholder='si/no'
                            value={data.column_option}
                            onChange={(e) => handleInputChangeArray(index, 'column_option', e.target.value)}
                          />
                          <input
                            className='border-b'
                            type="text"
                            name={`detalle_${data.name}`}
                            placeholder='¿Hace cuánto tiempo? / Tipo / Grado / Detalle'
                            value={data.column_last}
                            onChange={(e) => handleInputChangeArray(index, 'column_last', e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={`${!endodonciaDiagnostico ? 'hidden': ''}`}>
                      {Inputs_EndodonciaDiagnostico.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.tratamiento_endodoncia_diagnostico[data.name]}
                            onChange={(e) => handleInputChange("tratamiento_endodoncia_diagnostico", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!endodonciaTratamiento? 'hidden': ''}`}>
                      {Inputs_TratamientoEndodoncia_Padre.map((data, index)=>(
                        <Input
                          key={index}
                          label={data.label}
                          type={data.type}
                          id={data.id}
                          name={data.name}
                          placeholder={data.placeholder}
                          value={fetchData.tratamiento_endodoncia_tabla_unida[data.name]}
                          onChange={(e) => handleInputChange("tratamiento_endodoncia_tabla_unida", e)}
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
