import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <aside className='bg-white px-8'>
        <div>
            <img src="/img/logo.png" className='w-36' alt="" /></div>
        <div className='mb-5 mt-5 ml-5'>
            <Link className='text-2xl font-bold '>Salas</Link>
        </div>
        <div className='ml-5'>
            <Link className='text-2xl font-bold'>Cuenta</Link>
        </div>
    </aside>
  )
}
