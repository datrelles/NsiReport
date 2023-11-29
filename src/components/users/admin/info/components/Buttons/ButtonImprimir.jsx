import React from 'react'

export default function ButtonImprimir({onClick}) {
  return (
    <button
        className='border shadow-sm rounded-md absolute right-10 top-6 ml-auto py-2 px-4 hover:bg-slate-500 hover:text-white'
        onClick={onClick}
    >Exportar o Imprimir</button>
  )
}
