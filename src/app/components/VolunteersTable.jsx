'use client'
import {useContext, useEffect, useState} from 'react'
import { ErrorContext } from '../contexts/ErrorContext'
import { getCID,getVID } from '../db/functions'

function VolunteersTable() {
  const [volunteers,setVolunteers]=useState([])
  const setError=useContext(ErrorContext)
  const defaultNewVolunteer={
        V_ID:'',
        NAME:'',
        AGE:'',
        PHONE:'',
        ADDRESS:'',
        EXPERTISE:'',
        EMPLOYMENT:'',
        AVAILABLE_STATUS:'',
        AVAILABLE_DATE:'',
        AVAILABLE_TIME:'',
        CID:''
  }
  const [newVolunteer,setNewVolunteer]=useState(defaultNewVolunteer)
  const getVolunteers=async()=>{
    const data=await fetch('http://localhost:3000/details/VOLUNTEERS')
    const jsData=await data.json()
    setVolunteers(jsData)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const vIds=await getVID();
    const cIds=await getCID();

    if(vIds.some((v)=>{return v===Number(newVolunteer.V_ID)})){
      setError({message:'Volunteer ID should be unique!!!',isError:true})
    }
    else if(!cIds.some((c)=>{return c===Number(newVolunteer.CID)})){
      setError({message:'Center Does Not Exist!!!',isError:true})
    }
    else{
      await fetch('http://localhost:3000/details/VOLUNTEERS',{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(newVolunteer)})
      setNewVolunteer(defaultNewVolunteer)    
      setError({message:'',isError:false})
      await getVolunteers()
    }
  }

  const deleteVolunteer=async(volunteer)=>{
    await fetch('http://localhost:3000/details/VOLUNTEERS',{method:'DELETE',headers:{'Content-Type': 'application/json'},body:JSON.stringify(volunteer)});
    await getVolunteers();
  }

  useEffect(()=>{
    getVolunteers()
  },[])
  
  return (
    <>
      <div className="overflow-x-auto my-10">
        <table className="table my-5 text-center table-fixed break-words">
          <thead>
            <tr>
              <th>VOLUNTEER ID</th>
              <th>Name</th>
              <th>AGE</th>
              <th>PHONE(+91)</th>
              <th>ADDRESS</th>
              <th>EXPERTISE</th>
              <th>EMPLOYMENT</th>
              <th>AVAILABLE STATUS</th>
              <th>AVAILABLE DATE</th>
              <th>AVAILABLE TIME</th>
              <th>CENTER ID</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v)=>{
              return(<tr key={v.V_ID}>
                <td>{v.V_ID}</td>
                <td>{v.NAME}</td>
                <td>{v.AGE}</td>
                <td>{v.PHONE}</td>
                <td>{v.ADDRESS}</td>
                <td>{v.EXPERTISE}</td>
                <td>{v.EMPLOYMENT}</td>
                <td>{v.AVAILABLE_STATUS}</td>
                <td>{v.AVAILABLE_DATE}</td>
                <td>{v.AVAILABLE_TIME}</td>
                <td>{v.CID}</td>
                <td><button onDoubleClick={async()=>{await deleteVolunteer(v)}} className='btn btn-primary'>Delete</button></td>
              </tr>)
              })
              }
          </tbody>
  </table>
  </div>
  <h2>Add a Volunteer:</h2>
      <form className='flex justify-between gap-y-2 pt-2 flex-wrap col-span-1' onSubmit={async (e)=>{await handleSubmit(e)}}>
          <input required value={newVolunteer.V_ID}onChange={(e)=>{setNewVolunteer({...newVolunteer,V_ID:e.target.value})}}type="number" placeholder="Enter Volunteer ID" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.NAME}onChange={(e)=>{setNewVolunteer({...newVolunteer,NAME:e.target.value})}}type="text" placeholder="Enter Name" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.AGE}onChange={(e)=>{setNewVolunteer({...newVolunteer,AGE:e.target.value})}}type="number" placeholder="Enter Age" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.PHONE} pattern={'^[789][0-9]{9}'} onChange={(e)=>{setNewVolunteer({...newVolunteer,PHONE:e.target.value})}}type="text" placeholder="Enter Phone Number" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.ADDRESS}onChange={(e)=>{setNewVolunteer({...newVolunteer,ADDRESS:e.target.value})}}type="text" placeholder="Enter Address" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.EXPERTISE}onChange={(e)=>{setNewVolunteer({...newVolunteer,EXPERTISE:e.target.value})}}type="text" placeholder="Enter Expertise" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.EMPLOYMENT}onChange={(e)=>{setNewVolunteer({...newVolunteer,EMPLOYMENT:e.target.value})}}type="text" placeholder="Enter Employment" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.AVAILABLE_STATUS}onChange={(e)=>{setNewVolunteer({...newVolunteer,AVAILABLE_STATUS:e.target.value})}}type="text" placeholder="Enter Availability Status" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.AVAILABLE_DATE}onChange={(e)=>{setNewVolunteer({...newVolunteer,AVAILABLE_DATE:e.target.value})}}type="date" placeholder="Enter Availibility Date" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.AVAILABLE_TIME}onChange={(e)=>{setNewVolunteer({...newVolunteer,AVAILABLE_TIME:e.target.value})}}type="time" placeholder="Enter Availibility Time" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newVolunteer.CID}onChange={(e)=>{setNewVolunteer({...newVolunteer,CID:e.target.value})}}type="number" placeholder="Enter Center ID" className="input input-bordered input-accent w-half max-w-xs" />
          <button className='btn btn-primary'>Add</button>
      </form>
  </>
  )
}

export default VolunteersTable
