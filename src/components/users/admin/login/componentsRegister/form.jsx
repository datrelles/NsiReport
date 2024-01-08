import React, { useState } from 'react';
import { FaGooglePlusG, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { useAuthContext } from '../../../../../context/authContex';
import { postLogin } from '../../../../../services/api';
// import { getEnterprice } from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../../../common/loader/loader';

function Formulario() {
  // CONTEXTO LOGIN
  const { login, setAuthToken, setUserId } = useAuthContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [Loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error('Todos los campos son obligatorios')
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

    try {
      setLoading(true);
      const adminData = await postLogin(formData.email, formData.password)
      if(adminData.token){
        toast.success('usuario LOGEADO')
        setAuthToken(adminData.token)
        setUserId(adminData.id)
        login(adminData.role)
      }
      setFormData({
        email: '',
        password: '',
        role: ''
      });



    } catch (error) {
      // Aquí puedes manejar los errores si la solicitud falla
      if (error.message === 'Invalid identifier or password') {
        toast.error('Correo o contraseña invalidos')
        return;
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="mx-auto p-4">
      {Loading && <Loader />}
      <div className="flex justify-center space-x-4 mb-6">
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="appearance-none border rounded-lg w-full py-2 px-3 text-white bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center py-4">
          <button
            className=" bg-primary text-white font-bold py-2 px-14 rounded-full"
            type="submit"
          >
            Entrar
          </button>
        </div>
      </form>
      <p className="w-full text-base text-center  py-5 text-black">
        ¿ Olvidaste tu contraseña?
      </p>
      <ToastContainer className='mt-32' />
    </div>
  );
}

export default Formulario;
