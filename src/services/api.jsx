import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// REGISTROS DE USUARIOS

export const postRegister = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

// LOGIN
export const postLogin = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}

// OBTENER TODOS LOS USUARIOS (CLIENTES)
export const getUserAll = async (token) => {
  try {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_BASE_URL}/clients/all`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}

export const deleteUserById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}


// OBTENER INFORMACION PERSONAL DE UN USUARIO
export const getUserInfoByID = async (token, id) => {
  try {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_BASE_URL}/users/${id}/personal-information`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}
// Update Informacion personal del usuario
export const putInfoPersonalUser = async (token, body, id ) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_BASE_URL}/users/${id}/personal-information`, body, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}
// OBTENER HISTORIAL MEDICO DE UN USUARIO
export const getHistorialMedicoUserByID = async (token, id) => {
  try {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_BASE_URL}/users/${id}/historial-medico`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}
// Update HISTORIAL MEDICO del usuario
export const putHistorialMedicoUser = async (token, body, id ) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_BASE_URL}/users/${id}/historial-medico`, body, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}


// Obtener archivos de un usuario
export const uploadFile = async (token, id, body) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_BASE_URL}/file/upload/${id}`, body, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}
// Obtener archivos de un usuario
export const getFile = async (token, id ) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_BASE_URL}/file/${id}`, config);
    return response.data;
  } catch (error) {
    console.log(error)
    const errorMessage = error.message;
    throw new Error(errorMessage);

  }
}

// Obtener un archivo de un usuario
export const getFileByCategory = async (token, user_id, category) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({
      url: `${API_BASE_URL}/file/by-category/${user_id}/${category}`,
      category,
      user_id,
    })
    const response = await axios.get(`${API_BASE_URL}/file/by-category/${user_id}/${category}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
};

