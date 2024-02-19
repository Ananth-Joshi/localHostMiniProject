'use client'
import React, { useContext } from 'react'
import { ErrorContext } from '../contexts/ErrorContext'

function Error(props) {
  const setError=useContext(ErrorContext)
  return (
    <div role="alert" className="alert alert-error top-0 sticky ">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current cursor-pointer shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" onClick={()=>{setError({message:'',isError:false})}} ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>{props.message}</span>
    </div>
  )
}

export default Error
