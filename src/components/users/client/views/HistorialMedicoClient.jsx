import React, { useEffect, useState } from 'react'
import TableHistorialMedico from '../../admin/info/components/tables/TableHistorialMedico'
import { getHistorialMedicoUserByID } from '../../../../services/api';
import { useAuthContext } from '../../../../context/authContex';

export default function HistorialMedicoClient() {

    const [fetchData, setFetchData] = useState(null);
    const { jwt, id } = useAuthContext();

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
    <div>
      {fetchData && <TableHistorialMedico data={fetchData} />}
    </div>
  )
}
