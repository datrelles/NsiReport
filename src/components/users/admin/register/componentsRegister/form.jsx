import React, { useState } from 'react';
import { useAuthContext } from '../../../../../context/authContex';
import { postRegister} from '../../../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../../../common/loader/loader';


function Formulario() {
  // CONTEXTO LOGIN
  const { login, setAuthToken, setUserId } = useAuthContext();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [Loading, setLoading] = useState(false);



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };


  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleSubmit =  (event) => {
    
    event.preventDefault();
   
    //Validaciones de los campos:
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password
    ) {
      toast.error('Todos los campos son obligatorios')
      return;
    }

    if (/\d/.test(formData.fullName)) {
      toast.error('El nombre no puede contener numeros')
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error('El correo electrónico no es válido')
      return;
    }
    if (formData.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres')
      return;
    }
    
    const submitData = async () => {
      
      try {
        setLoading(true);
        const userData = await postRegister(formData);
        console.log(userData)
        toast.success('usuario REGISTRADO')
        // setUserId(modelEnterpriceData.data.id);
        // setAuthToken(enterpriceData.jwt);
        // login('client');

        // Limpia los campos del formulario después de un registro exitoso
        setFormData({
          fullName: '',
          email: '',
          password: ''
        });
        setLoading(false);

      } catch (error) {
        toast.error(error.message);
        console.log(error)
      }finally{
        setLoading(false);
      }

    }
    submitData();
  };



  return (
    <div className="mx-auto p-4">
      {Loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullName"
            type="text"
            placeholder="Nombres y Apellidos"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
 

        <div className="mb-4">
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center py-4">

          <button
            className="btn-lg bg-secondary text-primary font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Registrarse
          </button>

        </div>
      </form>
      <p className="w-full  text-justify  py-5 my-5 text-black">
        No te pierdas nuestras increíbles promociones. Regístrate ahora y obtén descuentos exclusivos
      </p>
      <ToastContainer className='mt-32' />
    </div>
  );
}

export default Formulario;
