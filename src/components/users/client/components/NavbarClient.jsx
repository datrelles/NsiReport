import React from 'react'

export default function NavbarClient() {
  return (
    <nav>
        <div
            className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
            onClick={handleViewDatosPersonales}    
        >
            Datos Personales
        </div>
        <div
            className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
            onClick={handleViewHistorialMedico}    
        >
            Historial Medico
        </div>  
    </nav>
  )
}
