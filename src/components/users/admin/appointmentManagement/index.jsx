import React, { useState } from 'react'
import CalentarTest from './CalentarTest';


export default function AppointmentManagement() {

  return (
    <div className='mx-20 my-10'>

        <h2 className='text-2xl font-semibold'>Próximas Consultas</h2>
        <CalentarTest></CalentarTest>
    </div>
  )
}
