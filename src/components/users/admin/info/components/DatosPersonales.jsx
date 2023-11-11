import React, { useEffect, useRef, useState } from 'react'
import Input from '../../../../common/inputs/Input'
import PopupForms from './PopupForms'
import { InputsDentalInformation, InputsInfoPersonal, InputsMedicalInformationQuestions, InputsMedicalInformationQuestionsMujeres, InputsPricipalData, InputsTutorData } from '../../../../../data/datosPersonales'
import TableDatosPersonales from './tables/TableDatosPersonales';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../../../context/authContex';
import { getUserInfoByID, putInfoPersonalUser } from '../../../../../services/api';

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

      // const body = {
      //   personaldatatable: {
      //     alerta_medica: e.target.alerta_medica.value || null,
      //     condicion: e.target.condicion.value || null,
      //     premedicacion: e.target.premedicacion.value || null,
      //     alergias: e.target.alergias.value || null,
      //     anestesia: e.target.anestesia.value || null,
      //     fecha: e.target.fecha.value || null,
      //   },
      //   dentalhealthanswers: {
      //     sangrado_encias: e.target.sangrado_encias.value || null,
      //     tratamiento_periodontal: e.target.tratamiento_periodontal.value || null,
      //     tratamiento_ortodoncia: e.target.tratamiento_ortodoncia.value || null,
      //     dientes_sensibles: e.target.dientes_sensibles.value || null,
      //     dientes_flojos: e.target.dientes_flojos.value || null,
      //     dolor_oido_o_cuello: e.target.dolor_oido_o_cuello.value || null,
      //     usa_dentadura: e.target.usa_dentadura.value || null,
      //     experiencia_dental_desagradable: e.target.experiencia_dental_desagradable.value || null,
      //     descripcion_experiencia_desagradable: e.target.descripcion_experiencia_desagradable.value || null,
      //     motivo_consulta: e.target.motivo_consulta.value || null,
      //     fecha_ultima_consulta: e.target.fecha_ultima_consulta.value || null,
      //     tratamiento_anterior: e.target.tratamiento_anterior.value || null,
      //     fecha_ultimos_rayos_x: e.target.fecha_ultimos_rayos_x.value || null,
      //     veces_cepillado_diario: e.target.veces_cepillado_diario.value || null,
      //     usa_hilo_dental: e.target.usa_hilo_dental.value || null,
      //     tecnica_cepillado_hilo_dental_ensenada: e.target.tecnica_cepillado_hilo_dental_ensenada.value || null,
      //   },
      //   medicalinformation: {
      //     tuberculosis_activa: e.target.tuberculosis_activa.value || null,
      //     tos_persistente: e.target.tos_persistente.value || null,
      //     tos_con_sangre: e.target.tos_con_sangre.value || null,
      //     toma_bebidas_alcoholicas: e.target.toma_bebidas_alcoholicas.value || null,
      //     fuma: e.target.fuma.value || null,
      //     usa_drogas: e.target.usa_drogas.value || null,
      //     dependencia_alcohol_drogas: e.target.dependencia_alcohol_drogas.value || null,
      //     cambio_salud_ultimos_dos_anios: e.target.cambio_salud_ultimos_dos_anios.value || null,
      //     bajo_tratamiento_medico: e.target.bajo_tratamiento_medico.value || null,
      //     enfermedad_en_tratamiento: e.target.enfermedad_en_tratamiento.value || null,
      //     alergico_medicamento: e.target.alergico_medicamento.value || null,
      //     alergias_descripcion: e.target.alergias_descripcion.value || null,
      //     buen_estado_salud_general: e.target.buen_estado_salud_general.value || null,
      //     medicamento_reciente: e.target.medicamento_reciente.value || null,
      //     motivo_medicamento: e.target.motivo_medicamento.value || null,
      //     recomendacion_antibiotico: e.target.recomendacion_antibiotico.value || null,
      //     tipo_y_dosis_antibiotico: e.target.tipo_y_dosis_antibiotico.value || null,
      //     hospitalizacion_ultimos_dos_anios: e.target.hospitalizacion_ultimos_dos_anios.value || null,
      //     reemplazo_articulacion: e.target.reemplazo_articulacion.value || null,
      //     embarazo: e.target.embarazo.value || null,
      //     amamantando: e.target.amamantando.value || null,
      //     anticonceptivos_hormonas: e.target.anticonceptivos_hormonas.value || null,
      //     cual_anticonceptivos_hormonas: e.target.cual_anticonceptivos_hormonas.value || null,
      //   },
      //   parentorguardianofpatient: {
      //     name: e.target.name.value,
      //     age: e.target.age.value,
      //     relationship: e.target.relationship.value,
      //     cell_phone: e.target.cell_phone.value,
      //     paternal_last_name: e.target.paternal_last_name.value,
      //     maternal_last_name: e.target.maternal_last_name.value,
      //     email: e.target.email.value,
      //     address: e.target.address.value,
      //     city: e.target.city.value,
      //     postal_code: e.target.postal_code.value,
      //   },
      //   personalinformation: {
      //     name: e.target.name.value || null,
      //     paternal_last_name: e.target.paternal_last_name.value || null,
      //     maternal_last_name: e.target.maternal_last_name.value || null,
      //     cell_phone: e.target.cell_phone.value || null,
      //     work_phone: e.target.work_phone.value || null,
      //     email: e.target.email.value || null,
      //     age: e.target.age.value || null,
      //     date_of_birth: e.target.date_of_birth.value || null,
      //     height_cm: e.target.height_cm.value || null,
      //     weight_kg: e.target.weight_kg.value || null,
      //     gender: e.target.gender.value || null,
      //     nationality: e.target.nationality.value || null,
      //     marital_status: e.target.marital_status.value || null,
      //     occupation: e.target.occupation.value || null,
      //     address: e.target.address.value || null,
      //     postal_code: e.target.postal_code.value || null,
      //     emergency_contact: e.target.emergency_contact.value || null,
      //     relationship: e.target.relationship.value || null,
      //     emergency_phone: e.target.emergency_phone.value || null,
      //     emergency_medical_service: e.target.emergency_medical_service.value || null,
      //     insurance: e.target.insurance.value || null,
      //   }
      // }

      // console.log(fetchData)

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