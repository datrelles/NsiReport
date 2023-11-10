import React from 'react'

export default function Input({className, onClick=undefined, required=false, type, id, name, placeholder, label, value, onChange}) {
  return (
    <div className='flex flex-col my-4'>
      <label htmlFor={name} className='text-slate-900 font-medium text-sm'>{label}</label>
      <input
        className={`border-b mt-2 focus:outline-none ${className}`}
        type={type}
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        onClick={onClick}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
