import React, { useEffect, useState } from 'react'
import TableHistorialMedico from './tables/TableHistorialMedico'
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getDiagnosticoDentalById, putDiagnosticoDentalById, putHistorialMedicoUser } from '../../../../../services/api';
import PopupForms from './PopupForms';
import Input from '../../../../common/inputs/Input';
import ButtonCreate from './Buttons/ButtonCreate';
import ButtonDownloadFile from './Buttons/ButtonDownloadFile';
import TableDiagnostico from './tables/TableDiagnostico';
import { Inputs_DiagnosticoGeneral, Inputs_DiagnosticoTratamientoAdicional } from '../../../../../data/inputsDiagnosticoDental';

export default function Diagnostico() {

  const [fetchData, setFetchData] = useState(null);
  const [activePopupCreate, setActivePopupCreate] = useState(false);
  
  const [diagnosticoGeneral, setDiagnosticoGeneral] = useState(true);
  const [diagnosticoDientes, setDiagnosticoDientes] = useState(false);
  const [diagnosticoTratamientoAdicional, setDiagnosticoTratamientoAdicional] = useState(false);
  
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
    setDiagnosticoGeneral(true);
    setDiagnosticoDientes(false);
    setDiagnosticoTratamientoAdicional(false);
    setButtonSend(false);
  }
  const handleNextPopupCreate = () => {
    switch (true) {
      case diagnosticoGeneral:
        setDiagnosticoGeneral(false);
        setDiagnosticoDientes(true);
        break;
      case diagnosticoDientes:
        setDiagnosticoDientes(false);
        setDiagnosticoTratamientoAdicional(true);
        setButtonSend(true);
        break;
      default:
        break;
    }
    
  }


  const reorganizeData = (data) => {
    const reorganizedData = { diagnosticoGeneral:{}, dientes: {}, tratamientoAdicional: {} };
  
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== "") {
        const match = key.match(/(\d+)$/);
  
        if (match) {
          const number = match[1];
          const prefix = key.replace(`_${number}`, "");
  
          if (!reorganizedData.dientes[number]) {
            reorganizedData.dientes[number] = {};
          }
  
          reorganizedData.dientes[number][prefix] = data[key];
        } else {
          // Si no hay un número al final, almacenar en otro objeto
          if (key === 'fecha') {
            reorganizedData.diagnosticoGeneral[key] = data[key];
          }else {
            reorganizedData.tratamientoAdicional[key] = data[key];
          }
          
        }
      }
    }
  
    return reorganizedData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const formData = {};
      const elements = e.target.elements;
  
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
  
        if (element.type !== 'submit') {
          // Omitir el botón de envío u otros elementos que no son inputs
          formData[element.name] = element.value;
        }
      }
      const reorganizedData = reorganizeData(formData);
      console.log({jwt, id})
      console.log(reorganizedData);

      const response = await putDiagnosticoDentalById(jwt, reorganizedData, id);
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
          const response = await getDiagnosticoDentalById(id)
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

      {fetchData && <TableDiagnostico data={fetchData} />}

      <PopupForms
        active={activePopupCreate}
        onClickClose={handleDesactivePopupCreate}
      >
          <form className="flex flex-col" onSubmit={handleSubmit}>
              <h1 className='text-lg font-bold mb-5'>{`
                Diagnostico Dental
                ${diagnosticoDientes ? '(Dientes)' : ''}
              `}</h1>
              

              {fetchData ?
                <React.Fragment>
                    <div className={`${!diagnosticoGeneral ? 'hidden': ''}`}>
                      {Inputs_DiagnosticoGeneral.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            value={fetchData.dental_diagnosticogeneral[data.name]}
                            onChange={(e) => handleInputChange("dental_diagnosticogeneral", e)}
                          />
                      ))}
                    </div>
                    <div className={`${!diagnosticoDientes ? 'hidden': ''}`}>
                      {fetchData.dental_dientes.map((data, index)=>(
                          <div key={`dientes_${index}`} className='mb-16'>
                            <h1 className='font-semibold text-lg italic'>{`Diente numero ${data.numero} (${data.posicion})`}</h1>
                            <article>
                              <Input
                                key={index}
                                label={'Diagnostico'}
                                type={'text'}
                                id={`diagnostico_${data.numero}`}
                                name={`diagnostico_${data.numero}`}
                                placeholder={'Escriba el diagnostico'}
                                // value={fetchData.dentistahistorialmedico[data.name]}
                                // onChange={(e) => handleInputChange("dentistahistorialmedico", e)}
                              />
                              <Input
                                key={index}
                                label={'Presupuesto'}
                                type={'number'}
                                id={`presupuesto_${data.numero}`}
                                name={`presupuesto_${data.numero}`}
                                placeholder={'00.00'}
                              />
                              <Input
                                key={index}
                                label={'Fecha'}
                                type={'date'}
                                id={`fecha_${data.numero}`}
                                name={`fecha_${data.numero}`}
                              />
                              <Input
                                key={index}
                                label={'Tratamiento'}
                                type={'text'}
                                id={`tratamiento_${data.numero}`}
                                name={`tratamiento_${data.numero}`}
                                placeholder={'Escriba el tratamiento'}
                              />
                              <Input
                                key={index}
                                label={'Abono'}
                                type={'number'}
                                id={`abono_${data.numero}`}
                                name={`abono_${data.numero}`}
                                placeholder={'00.00'}
                              />
                            </article>
                          </div>
                      ))}
                    </div>
                    <div className={`${!diagnosticoTratamientoAdicional ? 'hidden': ''}`}>
                      {Inputs_DiagnosticoTratamientoAdicional.map((data, index)=>(
                          <Input
                            key={index}
                            label={data.label}
                            type={data.type}
                            id={data.id}
                            name={data.name}
                            placeholder={data.placeholder}
                            // value={fetchData.dental_tratamientoadicional[0][data.name]}
                            // onChange={(e) => handleInputChange("dental_tratamientoadicional", e)}
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
