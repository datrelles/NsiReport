import React, { useState } from 'react';
import { deleteUserById } from '../../../../services/api';
import { useLocation, useNavigate } from 'react-router-dom';

function UserTable({ users, token }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserId, setEditedUserId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteUserById(token, id);
      window.location.reload();
      // Realiza alguna lógica adicional si es necesario, como recargar la lista de usuarios.
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleNavigate = (id) => {
    navigate(`${location.pathname}/${id}`);
    // setEditedUserId(id);
    // setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedUserId(null);
    setIsEditing(false);
  };

  return (
    <div className="">
      <table className="min-w-full divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name || 'N/A'}</td>
              <td>
                {isEditing && editedUserId === user.id ? (
                  <div>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleSaveEdits(user.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleNavigate(user.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Ver Info
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
