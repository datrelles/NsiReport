import React, { useEffect, useState } from 'react'
import { getAgendaById } from '../../../../services/api';
import { useAuthContext } from '../../../../context/authContex';
import moment from 'moment';

export default function TableAgenda() {

    const {jwt, id} = useAuthContext();
    const [dataAgenda, setDataAgenda] = useState(null);


    useEffect(()=>{
        const fecth = async () => {
            try {
                const responseAgenda = await getAgendaById(id);
                
                setDataAgenda(responseAgenda);
                // console.log(responseAgenda)
            } catch (error) {
                console.log(error)
                const errorMessage = error.message;
                throw new Error(errorMessage);
            }
        }
        fecth();
    },[])


  return (
    <div className=''>
        <h1 className='text-xl font-semibold mb-6'>Citas Agendadas</h1>
        <table>
            <thead>
                <tr>
                    <th className="font-semibold">n°</th>
                    <th className="font-semibold">title</th>
                    <th className="font-semibold">Fecha de inicio</th>
                    <th className="font-semibold">Fecha de cierre</th>
                </tr>
            </thead>
            <tbody>
                {dataAgenda && dataAgenda.map((data, index) =>(
                    <tr key={index}>
                        <td className='p-2 font-semibold'>{index}</td>
                        <td className='p-2'>{data.title}</td>
                        <td className='p-2'>{moment(data.start).format("dddd, DD MMMM yyyy (HH:mm a)")}</td>
                        <td className='p-2'>{moment(data.end).format("dddd, DD MMMM yyyy (HH:mm a)")}</td>
                    </tr>
                ))}
                    
            </tbody>
        </table>

        
    </div>
  )
}
