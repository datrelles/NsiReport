import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getFile, uploadFile } from '../../../services/api';
import { useAuthContext } from '../../../context/authContex';

export default function HomeClient() {
    
    const [fetchData, setFetchData] = useState([]);
    const {jwt, id}=useAuthContext();


    const URL_FETCH_DOWNLOAD = 'http://localhost:3000/file/download/';

    // Función para descargar el archivo
    const downloadFile = (filename) => {
        const link = document.createElement('a');
        link.href = `${URL_FETCH_DOWNLOAD}${encodeURIComponent(filename)}`;
        link.download = 'nombre_del_archivo.pdf'; // Puedes personalizar el nombre del archivo aquí
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileUpload = async (category) => {
        try {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf'; // Adjust the accepted file types if necessary
            fileInput.click();

            fileInput.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('category', category);

                    await uploadFile(jwt, id, formData);
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


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


    return (
        <div className='px-4 py-10 flex flex-row items-center justify-center gap-10'>
            {fetchData.length > 0 ? (
                <>
                    {fetchData.map((data, index) => (
                        <div key={index} className='border-2 p-10 flex flex-col justify-center items-center gap-10 w-fit rounded-md '>
                            <h2 className='font-medium text-xl'>{data.category}</h2>
                            <div className='flex flex-row gap-5'>
                                <button 
                                    className='p-2 bg-green-400 hover:bg-green-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                                    onClick={() => downloadFile(data.name)}
                                >Descargar archivo</button>
                                <button 
                                    className='p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                                    onClick={() => handleFileUpload(data.category)}
                                >Actualizar</button>
                            </div>
                        </div>
                    ))}

                    {/* Check for the number of files and display appropriate UI */}
                    {fetchData.length === 1 && fetchData[0].category === 'Historial Medico' && (
                        <div className='border-2 p-10 flex flex-col gap-10 justify-center items-center w-fit rounded-md'>
                            <h2 className='font-medium text-xl'>Datos Personales</h2>
                            <input
                                className='cursor-pointer p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                                type='button'
                                value='Subir archivo'
                                onClick={() => handleFileUpload('Datos Personales')}
                            />
                        </div>
                    )}

                    {fetchData.length === 1 && fetchData[0].category === 'Datos Personales' && (
                        <div className='border-2 p-10 flex flex-col gap-10 justify-center items-center w-fit rounded-md'>
                            <h2 className='font-medium text-xl'>Historial Medico</h2>
                            <input
                                className='cursor-pointer p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                                type='button'
                                value='Subir archivo'
                                onClick={() => handleFileUpload('Historial Medico')}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className='border-2 p-10 flex flex-col gap-10 justify-center items-center w-fit rounded-md'>
                        <h2 className='font-medium text-xl'>Datos Personales</h2>
                        <input
                            className='cursor-pointer p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                            type='button'
                            value='Subir archivo'
                            onClick={() => handleFileUpload('Datos Personales')}
                        />
                    </div>
                    <div className='border-2 p-10 flex flex-col gap-10 justify-center items-center w-fit rounded-md'>
                        <h2 className='font-medium text-xl'>Historial Medico</h2>
                        <input
                            className='cursor-pointer p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                            type='button'
                            value='Subir archivo'
                            onClick={() => handleFileUpload('Historial Medico')}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
