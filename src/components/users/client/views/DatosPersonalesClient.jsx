import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../context/authContex';
import { getUserInfoByID } from '../../../../services/api';
import TableDatosPersonales from '../../admin/info/components/tables/TableDatosPersonales';

export default function DatosPersonalesClient() {

    const [fetchData, setFetchData] = useState(null);
    const { jwt, id } = useAuthContext();

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
    <div>
        {fetchData && <TableDatosPersonales data={fetchData} />}
    </div>
  )
}
