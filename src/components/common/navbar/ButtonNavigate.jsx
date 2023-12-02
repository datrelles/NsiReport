import React from 'react'

export default function ButtonNavigate({onClick, text}) {
  return (
    <div
        className="p-2 shadow-md w-fit rounded-lg cursor-pointer"
        onClick={onClick}    
    >{text}</div>
  )
}
