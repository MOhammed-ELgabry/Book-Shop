import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
   const nanvigate=useNavigate()
  return (
    <div className='h-dvh w-[100%] flex justify-center gap-4 bg-red-300'>
      <button onClick={()=>{nanvigate('/register')}} className='btn btn-success text-white text-3xl font-bold'>register</button>
      <button onClick={()=>{nanvigate('/login')}} className='btn btn-bg-black text-white text-3xl font-bold'>login</button>
      <button></button>
    </div>
  )
}
