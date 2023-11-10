import React from 'react'

export default function PopupForms({children, active, onClickClose}) {


  return (
    <>
        {active && 
            <div className='bg-black/[.5] h-screen w-screen fixed top-0 flex justify-center items-center'>
                <div className='bg-white shadow-lg rounded-lg flex flex-col p-5 max-h-[90vh] overflow-auto w-[30rem]'>
                    <div
                        className='cursor-pointer ml-auto pb-5'
                        onClick={onClickClose}
                    >X</div>
                    {children}
                </div>
            </div>
        }
    </>
  )
}
