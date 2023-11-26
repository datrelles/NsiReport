import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es"; // Importa el idioma que desees para las fechas
import PopupForms from "../info/components/PopupForms";
import Input from "../../../common/inputs/Input";
import { useAuthContext } from "../../../../context/authContex";
import { getAgendaAll, getUserAll, postAgenda } from "../../../../services/api";


const hoursDiferent = 5;
const localizer = momentLocalizer(moment);

export default function CalentarTest() {
  
  const { jwt } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState({});
  const [events, setEvents] = useState(null);
  const [selectedDataEvent, setSelectedDataEvent] = useState(null);
  const [activePopup, setActivePopup] = useState(false);

  const handleDesactivatePopup = () => {
    setActivePopup(false);
  };

  const handleSelectSlot = ({ start, end }) => {
    start.setHours(start.getHours() - hoursDiferent);
    end.setHours(end.getHours() - hoursDiferent);
    setDate({ start, end });
    setActivePopup(true)
  };

  const handleSelectEvent = (event) => {
    setSelectedDataEvent(event);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const body = {
          title: e.target.title.value,
          user_id: e.target.user.value,
          start: date.start,
          end:  date.end,
        }

        const response = await postAgenda(jwt, body);
        // console.log(response)
        setActivePopup(false);
        window.location.reload();

    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserAll(jwt);
        const responseAgenda = await getAgendaAll(jwt);
        // console.log(response);
        // console.log(responseAgenda)
        setUsers(response);
        setEvents(responseAgenda);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {selectedDataEvent && (
        <div className="my-10 border-2 p-5">
          <h3 className="font-semibold">Titulo: <span className="font-normal"> {selectedDataEvent.title} </span> </h3>
          <h3 className="font-semibold">Usuario: <span className="font-normal"> {selectedDataEvent.user_name} </span> </h3>
          <h3 className="font-semibold">Contacto: <span className="font-normal"> {selectedDataEvent.user_username} </span> </h3>
          <h3 className="font-semibold">Fecha de inicio: <span className="font-normal"> {moment(selectedDataEvent.start).format("dddd, DD MMMM yyyy (HH:mm a)")} </span> </h3>
          <h3 className="font-semibold">Fecha de cierre: <span className="font-normal"> {moment(selectedDataEvent.end).format("dddd, DD MMMM yyyy (HH:mm a)")} </span> </h3>
        </div>
      )}
      {events &&
          <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              style={{ height: 500 }}
              defaultView="week"
              views={['week']}
          />
      }
      <PopupForms active={activePopup} onClickClose={handleDesactivatePopup}>
        <form onSubmit={handleSubmit}>
          <Input
            label={'Titulo'}
            type={'text'}
            id={'title'}
            name={'title'}
          />
          <select className="w-full" name='user' required>
            <option>--Seleccionar--</option>
            {users.map((data) => (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <button className="mt-20 w-full bg-emerald-500 text-white font-semibold px-8 py-4 rounded-md">
            Agendar Cita
          </button>
        </form>
      </PopupForms>
    </div>
  );
}
