import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../../../../assets/logo.png";

import { useReactToPrint } from "react-to-print";

import ButtonImprimir from "../Buttons/ButtonImprimir";
import { ParamsTable } from "../TDsTables";
import PopupForms from "../PopupForms";
import Input from "../../../../../common/inputs/Input";
import { Inputs_TratamientoEndodoncia_Create } from "../../../../../../data/inputsTratamientoEndodoncia";
import { deleteElementTratamientoEndodoncia, postElementTratamientoEndodoncia } from "../../../../../../services/api";
import { useAuthContext } from "../../../../../../context/authContex";
import { useParams } from "react-router-dom";

export default function TableTratamientoEndodoncia({
  data = null,
  admin = true,
}) {

  const [activePopupCreate, setActivePopupCreate] = useState(false);
  const tablesRef = useRef(null);

  const exportToPDF = useReactToPrint({
    content: () => tablesRef.current,
    documentTitle: "textPDF",
  });

  const handleActivePopupCreateElementTratamientoOndodoncia = () => setActivePopupCreate(true);
  const handleDesactivePopupCreateElementTratamientoOndodoncia = () => setActivePopupCreate(false);

  // console.log(data);

  return (
    <section className="w-full">
      <ButtonImprimir onClick={exportToPDF} />

      {data !== null ? (
            <>
                <div ref={tablesRef} className="p-10">
                    <section className="grid grid-cols-3 mb-10">
                        <img className="w-[40%] mx-20" src={Logo} alt="" />
                        <div></div>
                        <div></div>
                    </section>

                    <table className="w-full">
                        <thead>
                        <tr>
                            <th colSpan={2} className="!border-none bg-cyan-700 text-white">
                            ENDODONCIA
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <ParamsTable
                            label={`PACIENTE: `}
                            text={data.tratamiento_endodoncia_general.paciente}
                            />
                            <ParamsTable
                            label={`DOCTOR (A): `}
                            text={data.tratamiento_endodoncia_general.doctor}
                            />
                        </tr>
                        </tbody>
                    </table>

                    <table className="w-full mt-20">
                        <thead>
                        <tr>
                            <th colSpan={3} className="border-none"></th>
                            <th colSpan={1} className="text-left p-1">
                            Fecha:{" "}
                            <span className="font-normal">
                                {data.tratamiento_endodoncia_general.fecha}
                            </span>
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={4} className="">
                            DATOS DEL EXAMEN{" "}
                            </th>
                        </tr>
                        <tr>
                            <th
                            colSpan={4}
                            className="bg-cyan-700 min-h-[20ch] text-transparent"
                            >
                            .
                            </th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>SI</th>
                            <th>NO</th>
                            <th>¿Hace cuánto tiempo? / Tipo / Grado / Detalle</th>
                            {/* <th></th>
                                        <th>SI</th>
                                        <th>NO</th>
                                        <th>Grado</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {data.tratamiento_endodoncia_datos_del_examen.map((data, index) => (
                            <tr key={index}>
                                <TableRowDatosDelExamen
                                label={data.label}
                                option={data.column_option}
                                textColumn_last={data.column_last}
                                />
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <section className="my-10">
                        <p className="font-semibold">
                        Diagnóstico pulpar de presunción:{" "}
                        <span className="font-normal">
                            {
                            data.tratamiento_endodoncia_diagnostico
                                .diagnostico_pulpar_presuncion
                            }
                        </span>{" "}
                        </p>
                        <p className="font-semibold">
                        Diagnóstico periapical:{" "}
                        <span className="font-normal">
                            {data.tratamiento_endodoncia_diagnostico.diagnostico_periapical}
                        </span>{" "}
                        </p>
                        <p className="font-semibold">
                        Diagnóstico definitivo:{" "}
                        <span className="font-normal">
                            {data.tratamiento_endodoncia_diagnostico.diagnostico_definitivo}
                        </span>{" "}
                        </p>
                        <p className="mt-6 font-bold">
                        Tratamiento indicado:{" "}
                        <span className="font-normal">
                            {data.tratamiento_endodoncia_diagnostico.tratamiento_indicado}
                        </span>{" "}
                        </p>
                    </section>

                    <section className="my-10 text-center">
                        <h1 className="font-bold">ACEPTACIÓN DEL TRATAMIENTO</h1>
                        <p className="text-left">
                        Doy mi consentimiento para que se me realicen los procedimientos
                        clínicos necesarios para mantener o recobrar mi salud bucal. Estoy
                        de acuerdo en los tratamientos sugeridos por el estomatólogo de la
                        clínica Dental Prado.
                        </p>
                        <div className="flex flex-row gap-10 justify-center w-full mt-20">
                        <p className="font-bold border-t border-black text-center w-full">
                            Nombre y firma del paciente
                        </p>
                        <p className="font-bold border-t border-black text-center w-full">
                            Nombre y firma del dentista
                        </p>
                        </div>
                    </section>

                    <section className="my-10">
                        <h1 className="font-bold text-center">CONSENTIMIENTO INFORMADO</h1>
                        <p className="flex flex-row justify-start">
                        El/la que suscribe
                        <SpanCartaConsentimiento
                            text={
                            data.tratamiento_endodoncia_general.consentimiento_firmado
                            }
                        />
                        otorgo mi consentimiento y autorizo para recibir atención dental
                        en la CLÍNICA DENTAL PRADO.
                        </p>
                        <p>
                        A propósito declaro haber sido informado y haber comprendido las
                        ventajas de el/los tratamiento(s) que se realizará(n) con el
                        propósito de preservar o recobrar mi salud y tengo pleno
                        conocimiento de los riesgos, estando presentes o que se pueden
                        presentar antes, durante y después del tratamiento y pueden ser,
                        aunque no se limitan, los siguientes:
                        </p>
                        <p>
                        Lesiones leves o graves, ligera molestia, sensibilidad, dolor,
                        inflamación, tumefacción, trismus, infección, alergia, parestesia,
                        pérdida de hueso alveolar, anquilosis, ruptura de instrumentos,
                        perforación radicular, fractura coronal y/o radicular, fracaso del
                        tratamiento, pérdida del diente tratado, arritmia, lipotimia,
                        desmayo, infarto, paro cardiaco, aborto y pérdida de la vida.
                        </p>
                        <p>
                        Enterado de todo esto como paciente doy mi autorización y
                        aceptación del tratamiento y doy mi consentimiento para que el
                        profesional actúe del modo que considere necesario durante los
                        distintos procedimientos clínicos, por el exclusivo interés de mi
                        salud. Asimismo, doy mi autorización para la administración de
                        anestésicos, antibióticos, analgésicos y otras sustancias químicas
                        necesarias para el tratamiento. Si durante o después de la
                        intervención surgiera una situación anátomo-patológica distinta y
                        más grave a la prevista, doy mi consentimiento para que se actúe
                        del modo más conveniente, según la ciencia y conciencia, por el
                        exclusivo interés de mi salud. En caso de que el tratamiento
                        requiera dos o más citas, me comprometo a asistir a ellas en el
                        tiempo indicado hasta que el tratamiento sea completado, de no
                        hacerlo acepto las consecuencias que dicho acto pudiera originar,
                        dando por enterado mi egreso voluntario. Comprendo que el
                        tratamiento endodóntico es sólo un paso en la devolución de la
                        función dental completa, que se debe colocar una restauración
                        final adecuada entre 8 a 15 días después de haber finalizado la
                        intervención endodóntica, y tengo conocimiento de que al no
                        hacerlo las probabilidades de fractura, dolor y/o reinfección
                        aumentan.{" "}
                        </p>
                        <p>
                        Es posible que exista adicionalmente al proceso infeccioso o
                        inflamatorio, un cuadro granulomatoso o quístico que requiera la
                        aplicación de otras técnicas terapéuticas. Entiendo que si el
                        tratamiento fracasa puede ser necesario un retratamiento, la
                        intervención quirúrgica del extremo radicular (apicectomía), la
                        eliminación de la raíz afectada (radicectomía) o la extracción del
                        diente tratado. Estando de acuerdo con esto libero de cualquier
                        responsabilidad administrativa, civil, penal al personal de salud
                        por las acciones en el ejercicio de su profesión.{" "}
                        </p>
                        <p>
                        Todas mis dudas han sido aclaradas y estoy completamente de
                        acuerdo con lo consignado en este consentimiento.
                        </p>
                        <div className="flex flex-row gap-10 justify-center w-full mt-20">
                        <p className="font-bold border-t border-black text-center w-full">
                            Nombre y firma del paciente
                        </p>
                        <p className="font-bold border-t border-black text-center w-full">
                            Nombre y firma del dentista
                        </p>
                        </div>
                        <p className="flex flex-row justify-start mt-20">
                        {data.tratamiento_endodoncia_general.direccion ? (
                            data.tratamiento_endodoncia_general.direccion
                        ) : (
                            <>
                            Tijuana. Baja California a
                            <SpanCartaConsentimiento text={""} />
                            de
                            <SpanCartaConsentimiento text={""} />
                            de 20
                            <SpanCartaConsentimiento text={""} />.
                            </>
                        )}
                        </p>
                    </section>

                    <table className="w-full">
                        <thead>
                        <tr>
                            <th
                            colSpan={10}
                            className="!border-none bg-cyan-700 text-white"
                            >
                            TRATAMIENTO DE ENDODONCIA
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={1} className="text-xs text-left p-1">
                            DIENTE: {data.tratamiento_endodoncia_tabla_unida.diente}
                            </th>
                            <th colSpan={1} className="text-xs text-left p-1">
                            VITAL: {data.tratamiento_endodoncia_tabla_unida.vital}
                            </th>
                            <th colSpan={2} className="text-xs text-left p-1">
                            NECRÓTICO: {data.tratamiento_endodoncia_tabla_unida.necrotico}
                            </th>
                            <th colSpan={1} className="text-xs text-left p-1">
                            COSTO: {data.tratamiento_endodoncia_tabla_unida.costo}
                            </th>
                            <th colSpan={2} className="text-xs text-left p-1">
                            FECHA DE INICIO: {data.tratamiento_endodoncia_tabla_unida.fecha_inicio}
                            </th>
                            <th colSpan={3} className="text-xs text-left p-1">
                            FECHA DE OBTURACIÓN:{" "}
                            {data.tratamiento_endodoncia_tabla_unida.fecha_obturacion}
                            </th>
                        </tr>
                        <tr>
                            <th colSpan={10} className="text-transparent">
                            .
                            </th>
                            <th className="border-none">
                            {admin &&
                              <button
                                  className="bg-cyan-500 text-white drop-shadow-2xl px-8 py-1 rounded-full shadow-sm"
                                  onClick={
                                  handleActivePopupCreateElementTratamientoOndodoncia
                                  }
                              >
                                  Crear
                              </button>
                            }
                            </th>
                        </tr>
                        <tr>
                            <th className="font-medium">FECHA</th>
                            <th className="font-medium">PROCEDIMIENTO</th>
                            <th className="font-medium">CONDUCTO</th>
                            <th className="font-medium">CONDUCTOM. TENTATIVA</th>
                            <th className="font-medium">CONDUCTOM. DEFINITIVA</th>
                            <th className="font-medium">REFERENCIA</th>
                            <th className="font-medium">ÚLTIMA LIMA APICAL</th>
                            <th className="font-medium">NOTAS</th>
                            <th className="font-medium">ABONO</th>
                            <th className="font-medium">BALANCE</th>
                            {admin ? <th className="font-medium">OPCIONES</th> : ""}
                        </tr>
                        </thead>
                        <tbody>
                        {data.tratamiento_endodoncia.map((data, index) => (
                            <TableRowTratamientoEndodoncia
                            key={index}
                            id={data.id}
                            admin={admin}
                            fecha={data.fecha}
                            procedimiento={data.procedimiento}
                            conducto={data.conducto}
                            conductoTentativa={data.conducto_tentativa}
                            conductoDefinitiva={data.conducto_definitiva}
                            referencia={data.referencia}
                            ultimaLimaApical={data.ultima_lima_apical}
                            notas={data.notas}
                            abono={data.abono}
                            balance={data.balance}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
                <PopupCreateElementTratamientoOndodoncia activePopupCreate={activePopupCreate}  handleDesactivePopupCreate={handleDesactivePopupCreateElementTratamientoOndodoncia} tratamientoId={data.tratamiento_endodoncia_tabla_unida.id} />
            </>
      ) : (
        ""
      )}

    </section>
  );
}

function SpanCartaConsentimiento({ text }) {
  return (
    <span className="border-b border-black min-w-[10ch] mx-2">{text}</span>
  );
}
const TableRowTratamientoEndodoncia = ({
  fecha,
  procedimiento,
  conducto,
  conductoTentativa,
  conductoDefinitiva,
  referencia,
  ultimaLimaApical,
  notas,
  abono,
  balance,
  admin,
  id,
}) => {
    
  const { id: userId } = useParams();
  const { jwt } = useAuthContext();
  const [deleted, setDeleted] = useState(false);

  const handleDeletedPopup = async () => {
    try {
      await deleteElementTratamientoEndodoncia(jwt, userId, id);
      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (deleted) {
    return null; // O cualquier lógica para manejar el estado después de la eliminación
  }

  return (
    <>
      <tr>
        <td className="">{fecha}</td>
        <td className="">{procedimiento}</td>
        <td className="">{conducto}</td>
        <td className="">{conductoTentativa}</td>
        <td className="">{conductoDefinitiva}</td>
        <td className="">{referencia}</td>
        <td className="">{ultimaLimaApical}</td>
        <td className="">{notas}</td>
        <td className="">{abono}</td>
        <td className="">{balance}</td>
        {admin ? 
            <td>
                <div className="flex flex-row gap-1 items-center justify-center">
                    <button
                        onClick={handleDeletedPopup}
                        className="text-xs py-1 px-2 bg-red-700 rounded-lg m-2 text-white"
                    >Borrar</button>
                </div>
            </td>
        : null}
      </tr>
    </>
  );
};
const TableRowDatosDelExamen = ({ label, option, textColumn_last }) => {
  return (
    <>
      <td>{label}</td>
      <td className="text-center">{option === "si" ? "X" : ""}</td>
      <td className="text-center">{option === "no" ? "X" : ""}</td>
      <td>{textColumn_last}</td>
    </>
  );
};
const PopupCreateElementTratamientoOndodoncia = ({activePopupCreate, handleDesactivePopupCreate, tratamientoId}) => {

    const { id } = useParams();
    const { jwt } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            ;
            const body = {
                fecha: e.target.fecha.value || null ,
                procedimiento: e.target.procedimiento.value || null,
                conducto: e.target.conducto.value || null ,
                conducto_tentativa: e.target.conducto_tentativa.value || null ,
                conducto_definitiva: e.target.conducto_definitiva.value || null ,
                referencia: e.target.referencia.value || null ,
                ultima_lima_apical: e.target.ultima_lima_apical.value || null ,
                notas: e.target.notas.value || null ,
                abono: e.target.abono.value || null ,
                balance: e.target.balance.value || null ,
            }
            const response = await postElementTratamientoEndodoncia(jwt, body, id, tratamientoId);
            console.log(response);
            handleDesactivePopupCreate();
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <PopupForms
      active={activePopupCreate}
      onClickClose={handleDesactivePopupCreate}
    >
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <h1 className="text-lg font-bold mb-5">
          Crear Tratamiento - Endodoncia
        </h1>
        {Inputs_TratamientoEndodoncia_Create.map((data, index)=>(
            <Input
                key={index}
                label={data.label}
                type={data.type}
                id={data.name}
                name={data.name}
                placeholder={data.placeholder}
            />
        ))}
          <button
            className="border rounded-md w-full py-2 px-4 text-white font-semibold bg-green-500 hover:bg-green-600"
            type="submit"
          >
            Guardar
          </button>
      </form>
    </PopupForms>
  );
};
