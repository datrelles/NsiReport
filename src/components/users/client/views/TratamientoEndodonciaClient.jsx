import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../context/authContex';
import { getTratamientoEndodonciaById } from '../../../../services/api';
import TableTratamientoEndodoncia from '../../admin/info/components/tables/TableTratamientoEndodoncia';

export default function TratamientoEndodonciaClient() {

  const [fetchData, setFetchData] = useState(null);
  const { id } = useAuthContext();


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
      {fetchData && <TableTratamientoEndodoncia data={fetchData} admin={false} />}
    </div>
  )
}
