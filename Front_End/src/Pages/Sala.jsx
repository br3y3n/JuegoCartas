import React from 'react'
import { Card } from '../Components/Card'

export const Sala = () => {
  return (
    <>
      <div className='flex justify-center items-center bg-[url(/img/bgStadium.png)] bg-cover bg-center h-svh'>
          <img className='flex justify-center items-center h-[40em]' src='../public/img/bgTable.png'/>
          <Card/>
      </div>
    </>
  )
}
