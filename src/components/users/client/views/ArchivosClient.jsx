import React, { useEffect, useState } from 'react'
import TableAgenda from '../components/TableAgenda';
import { useAuthContext } from '../../../../context/authContex';
import { getFile, uploadFile } from '../../../../services/api';


const categories = [
    "Datos Personales",
    "Historial Medico",
    "Radiografias",
]
const handleFileUpload = async (jwt, user_id, category) => {
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

                await uploadFile(jwt, user_id, formData);
                window.location.reload();
            }
        });
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

export default function ArchivosClient() {

    
    const {jwt, id}=useAuthContext();
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
                {categories.map((category)=>{
                    const file = fetchData.find((data) => data.category === category);

                    return (
                        <React.Fragment key={category}>
                            {file ? (
                                <ButtonFileUploaded category={category} name={file.name} />
                            ) : (
                                <ButtonUpload title={`Subir ${category}`} category={category} />
                            )}
                        </React.Fragment>
                    );
                })}
            </section>
            <p className='text-slate-500 text-center'>Acepta cualquier tipo de archivos, pero se recomienda que se suban arhivos .pdf</p>
        </div>
        <TableAgenda />
    </div>
  )
}


const ButtonUpload = ({title, category}) => {

    const {jwt, id}=useAuthContext();

    return (
        <div className='border-2 p-10 flex flex-col gap-10 justify-center items-center w-fit rounded-md'>
            <h2 className='font-medium text-xl'>{title}</h2>
            <input
                className='cursor-pointer p-2 bg-cyan-400 hover:bg-cyan-600 rounded-md shadow-sm hover:text-white font-medium drop-shadow-lg'
                type='button'
                value='Subir archivo'
                onClick={() => handleFileUpload(jwt, id, category)}
            />
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

