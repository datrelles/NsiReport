import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../../../context/authContex';
import { getFile, uploadFile } from '../../../../../services/api';
import { useParams } from 'react-router-dom';


const categories = [
    "Datos Personales",
    "Historial Medico",
    "Radiografias",
]

export default function Archivos() {

    const {id} = useParams();
    const {jwt}=useAuthContext();
    const [fetchData, setFetchData] = useState([]);
    
    useEffect(()=>{
        const fecth = async () => {
            try {
                const response = await getFile(jwt, id);
                setFetchData(response.files);
            } catch (error) {
                console.log(error)
                const errorMessage = error.message;
                throw new Error(errorMessage);
            }
        }
        fecth();
    },[])
    // console.log(fetchData)


  return (
    <div className='px-4 py-10 flex flex-col items-center gap-16'>
        <div className='flex flex-col gap-2 items-center'>
            <section className='flex flex-wrap items-center justify-center gap-10'>
                {fetchData.length > 0 ? 
                    <>
                        {fetchData.map((data, index)=>(
                            <ButtonFileUploaded key={index} category={data.category} name={data.name} />
                        ))}
                    </>
                : <p className='text-3xl font-bold italic text-gray-900 mt-20'>El usuario no tiene archivos subidos</p>
                }
            </section>
        </div>
    </div>
  )
}

const ButtonFileUploaded = ({name, category}) => {

    const {jwt, id}=useAuthContext();
    const URL_FETCH_DOWNLOAD = 'http://localhost:3000/file/download/';

    const downloadFile = (filename) => {
        const link = document.createElement('a');
        link.href = `${URL_FETCH_DOWNLOAD}${encodeURIComponent(filename)}`;
        link.download = 'nombre_del_archivo.pdf'; // Puedes personalizar el nombre del archivo aquí
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className='border-2 p-10 flex flex-col justify-center items-center gap-10 w-fit rounded-md '>
            <h2 className='font-medium text-xl'>{category}</h2>
            <div className='flex flex-row gap-5'>
                <button 
                    className='p-2 bg-green-400 hover:bg-green-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                    onClick={() => downloadFile(name)}
                >Descargar archivo</button>
                <button 
                    className='p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                    onClick={() => handleFileUpload(jwt, id, category)}
                >Actualizar</button>
            </div>
        </div>
    )
}

