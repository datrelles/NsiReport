import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../context/authContex';
import { getCartaConsentimentoById } from '../../../../services/api';
import TableCartaConsentimiento from '../../admin/info/components/tables/TableCartaConsentimiento';

export default function CartaConsentimientoClient() {

  const [fetchData, setFetchData] = useState(null);
  const { id } = useAuthContext();

  useEffect(() => {
    const getDataTable = async () => {
        try {
          const response = await getCartaConsentimentoById(id)
          setFetchData(response);
        } catch (error) {
          console.error(error)
        }
    }
    getDataTable();
  },[])


  return (
    <div className='pt-6 relative'>
      {fetchData && <TableCartaConsentimiento data={fetchData} />}
    </div>
  )
}
