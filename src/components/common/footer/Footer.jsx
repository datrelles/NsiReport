import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.png'
import { Item } from './Item'
import { CONTACTO, CATEGORIAS, LEGAL } from './Menu'

export const Footer = () => {
    return (
        <footer className='bg-white text-primary flex'>
            <div className='mx-10 grid grid-cols-1 md:grid-cols-4 gap-4 py-8'>
               <Link to='/'>
                <div className='flex w-[30vw] h-[8vh] md:h-[10vh]'>
                    <img src={Logo} alt="" />
                </div>
                </Link>
                <Item Links={CONTACTO} title={'CONTACTO'} />
                <Item Links={CATEGORIAS} title={'TRAMITES'}/>
                <Item Links={LEGAL} title={'LEGAL'} />
            </div>
        </footer>
    )
}
