import React, { useEffect, useState } from 'react'
import TableDiagnostico from '../../admin/info/components/tables/TableDiagnostico';
import { useAuthContext } from '../../../../context/authContex';
import { getDiagnosticoDentalById } from '../../../../services/api';

export default function DiagnosticoClient() {

  const [fetchData, setFetchData] = useState(null);
  const { id } = useAuthContext();

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
      {fetchData && <TableDiagnostico data={fetchData} />}
    </div>
  )
}
