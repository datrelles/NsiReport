import React, { useEffect, useState } from 'react'
import { getFileByCategory } from '../../../../../services/api';
import { useAuthContext } from '../../../../../context/authContex';
import { useParams } from 'react-router-dom';

export default function ButtonDownloadFile({category}) {

    const [data, setData] = useState([]);
    const {jwt} = useAuthContext();
    const { id } = useParams();
    const URL_FETCH_DOWNLOAD = 'http://localhost:3000/file/download/';

    // Función para descargar el archivo
    const downloadFile = async (filename) => {
        const link = document.createElement('a');
        link.href = `${URL_FETCH_DOWNLOAD}${encodeURIComponent(filename)}`;
        link.download = 'nombre_del_archivo.pdf'; // Puedes personalizar el nombre del archivo aquí
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(()=>{
        const fecth = async () => {
            try {
                const response = await getFileByCategory(jwt, id, category);
                // console.log(response.files)
                setData(response.files);
            } catch (error) {
                console.log(error)
                const errorMessage = error.message;
                throw new Error(errorMessage);
            }
        }

        fecth();
    },[category])

  return (
    <>
        {data.length > 0 && (
            <button
                className='p-2 bg-green-400 hover:bg-green-600 rounded-md shadow-sm text-white font-medium drop-shadow-lg'
                onClick={() => downloadFile(data[0].name)}
            >
            Descargar archivo del usuario
            </button>
        ) }
    </>
  )
}
