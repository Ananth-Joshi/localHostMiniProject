'use client'
import {useContext, useEffect, useState} from 'react'
import { getCID, getVID } from '../db/functions'
import { ErrorContext } from '../contexts/ErrorContext'
import { isNull } from 'tls'


function PetTable() {
  const [pets,setPets]=useState([])
  const setError=useContext(ErrorContext)
  const defaultNewPet={
    PET_ID:'',
    NAME:'',
    TYPE:'',
    AGE:'',
    VACCINATION:'',
    GENDER:'',
    LOCATION:'',
    SEVERITY:'',
    DESCRIPTION:'',
    CID:'',
    PCARE:'',
    V_ID:'',
}
  const [newPet,setNewPet]=useState(defaultNewPet)

  const getPets=async()=>{
    const data=await fetch('http://localhost:3000/details/PET')
    const jsData=await data.json();
    setPets(jsData)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const vIds=await getVID();
    const cIds=await getCID();
    if(pets.some((p)=>{return (p.PET_ID===Number(newPet.PET_ID))})){
        setError({message:'Pet ID must be Unique!!!',isError:true})
    }
    else if(!cIds.some((c)=>{return c===Number(newPet.CID)})){
      setError({message:'Center Does Not Exist!!!',isError:true})
    }
    else if(!vIds.some((v)=>{return v===Number(newPet.V_ID)})){
      setError({message:'Volunteer Does Not Exist!!!',isError:true})
    }
    else{
      await fetch('http://localhost:3000/details/PET',{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(newPet)})
      setError({message:'',isError:false})
      setNewPet(defaultNewPet)
      await getPets()
    }
  }

  const deletePet=async(pet)=>{
    await fetch('http://localhost:3000/details/PET',{method:'DELETE',headers:{'Content-Type': 'application/json'},body:JSON.stringify(pet)});
    await getPets();
  }
  useEffect(()=>{
    getPets()
    
  },[])
  return (
    <>
      <div className="overflow-x-auto my-10">
        <table className="table text-center my-5">
          <thead>
            <tr>
              <th>PET_ID</th>
              <th>Name</th>
              <th>TYPE</th>
              <th>AGE</th>
              <th>VACCINATION</th>
              <th>GENDER</th>
              <th>LOCATION</th>
              <th>SEVERITY</th>
              <th>DESCRIPTION</th>
              <th>CID</th>
              <th>PCARE</th>
              <th>V_ID</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
          {pets.map((pet)=>{
            return(<tr key={pet.PET_ID}>{console.log(pet)}
              <td>{pet.PET_ID}</td>
              <td>{pet.NAME}</td>
              <td>{pet.TYPE}</td>
              <td>{pet.AGE}</td>
              <td>{pet.VACCINATION}</td>
              <td>{pet.GENDER}</td>
              <td>{pet.LOCATION}</td>
              <td>{pet.SEVERITY}</td>
              <td>{pet.DESCRIPTION}</td>
              <td>{pet.CID}</td>
              <td>{pet.PCARE}</td>
              <td>{(pet.V_ID)?(pet.V_ID):('NULL')}</td>
              <td><button className='btn btn-primary' onDoubleClick={async()=>{await deletePet(pet)}}> Delete</button></td>
            </tr>)
            })
            }
          </tbody>
        </table>
      </div>
      <h2>Add a Pet:</h2>
      <form className='flex justify-between gap-y-2 pt-2 flex-wrap col-span-1' onSubmit={async (e)=>{await handleSubmit(e)}}>
          <input required value={newPet.PET_ID} onChange={(e)=>{setNewPet({...newPet,PET_ID:e.target.value})}}type="number" placeholder="Enter Pet ID" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.NAME} onChange={(e)=>{setNewPet({...newPet,NAME:e.target.value})}}type="text" placeholder="Enter Name" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.TYPE} onChange={(e)=>{setNewPet({...newPet,TYPE:e.target.value})}}type="text" placeholder="Enter Type" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.AGE} onChange={(e)=>{setNewPet({...newPet,AGE:e.target.value})}}type="number" placeholder="Enter Age" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.VACCINATION} onChange={(e)=>{setNewPet({...newPet,VACCINATION:e.target.value})}}type="text" placeholder="Enter Vaccination Status" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.GENDER} onChange={(e)=>{setNewPet({...newPet,GENDER:e.target.value})}}type="text" placeholder="Enter Gender" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.LOCATION} onChange={(e)=>{setNewPet({...newPet,LOCATION:e.target.value})}}type="text" placeholder="Enter Location" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.SEVERITY} onChange={(e)=>{setNewPet({...newPet,SEVERITY:e.target.value})}}type="text" placeholder="Enter Severity" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.DESCRIPTION} onChange={(e)=>{setNewPet({...newPet,DESCRIPTION:e.target.value})}}type="text" placeholder="Enter Description" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.CID} onChange={(e)=>{setNewPet({...newPet,CID:e.target.value})}}type="number" placeholder="Enter Center ID" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.PCARE} onChange={(e)=>{setNewPet({...newPet,PCARE:e.target.value})}}type="text" placeholder="Enter Pet Care" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newPet.V_ID} onChange={(e)=>{setNewPet({...newPet,V_ID:e.target.value})}}type="number" placeholder="Enter Volunteer ID" className="input input-bordered input-accent w-half max-w-xs" />
          <button className='btn btn-primary'>Add</button>
      </form>
    </>
  )
}

export default PetTable
