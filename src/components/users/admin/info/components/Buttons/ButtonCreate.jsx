import React from 'react'

export default function ButtonCreate({onClick, text}) {
  return (
    <button
        className='rounded-md shadow-sm w-fit bg-slate-900 text-white cursor-pointer p-2'
        onClick={onClick}
    >Crear</button>
  )
}
