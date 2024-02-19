'use client'
import {useContext, useEffect, useState} from 'react'
import { getCID } from '../db/functions'
import { ErrorContext } from '../contexts/ErrorContext'


function AllocationTable() {
  const [allocations,setAllocations]=useState([])
  const setError=useContext(ErrorContext)
  const defaultNewAllocation={
    A_NAME:'',
    A_AMOUNT:'',
    CID:''
  }
  const [newAllocation,setNewAllocation]=useState(defaultNewAllocation)
  const getAllocations=async()=>{
    const data=await fetch('http://localhost:3000/details/ALLOCATION')
    const jsData=await data.json()
    setAllocations(jsData)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const cidArray=await getCID();
    if(!cidArray.some((c)=>{return c===Number(newAllocation.CID)})){
      setError({message:'Center Does Not Exist!!!',isError:true})
    }
    else{
      await fetch('http://localhost:3000/details/ALLOCATION',{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(newAllocation)})
      setError({message:'',isError:false})
      setNewAllocation(defaultNewAllocation)
      await getAllocations();
    }
  }

  const deleteAllocation=async(allocation)=>{
    await fetch('http://localhost:3000/details/ALLOCATION',{method:'DELETE',headers:{'Content-Type': 'application/json'},body:JSON.stringify(allocation)})
    console.log(allocation)
    await getAllocations();
  }
  useEffect(()=>{
    getAllocations()
  },[])
  return (
    <div className="overflow-x-auto my-10">
      <table className="table my-5 text-center table-fixed break-words">
        <thead>
          <tr>
            <th>ALLOCATION NAME</th>
            <th>ALLOCATION AMOUNT</th>
            <th>CENTER ID</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map((a)=>{
            return(<tr key={allocations.indexOf(a)+1}>
              <td>{a.A_NAME}</td>
              <td>{a.A_AMOUNT}</td>
              <td>{a.CID}</td>
              <td><button onDoubleClick={async()=>{await deleteAllocation(a)}}className='btn btn-primary'>Delete</button></td>
            </tr>)
            })
            }
          </tbody>
      </table>
      <h2>Add an Allocation:</h2>
          <form className='flex justify-between pt-2' onSubmit={async (e)=>{await handleSubmit(e)}}>
              <input required value={newAllocation.A_NAME}onChange={(e)=>{setNewAllocation({...newAllocation,A_NAME:e.target.value})}}type="text" placeholder="Enter Allocation Name" className="input input-bordered input-accent w-half max-w-xs" />
              <input required value={newAllocation.A_AMOUNT}onChange={(e)=>{setNewAllocation({...newAllocation,A_AMOUNT:e.target.value})}}type="number" placeholder="Enter Amount" className="input input-bordered input-accent w-half max-w-xs" />
              <input required value={newAllocation.CID}onChange={(e)=>{setNewAllocation({...newAllocation,CID:e.target.value})}}type="number" placeholder="Enter Center Id" className="input input-bordered input-accent w-half max-w-xs" />
              <button className='btn btn-primary'>Add</button>
          </form>
  </div>
  )
}

export default AllocationTable;
