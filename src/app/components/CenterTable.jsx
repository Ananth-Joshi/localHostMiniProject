'use client'
import {useContext, useEffect, useState} from 'react'
import { ErrorContext } from '../contexts/ErrorContext'

function CenterTable() {
    const [centers,setCenters]=useState([])
    const setError=useContext(ErrorContext);
    const defaultCenter={
          CID:'',
          LOCATION:'',
          CONTACT_INFO:'',
          NO_OF_VOLUNTEERS:'',
          NO_OF_PETS:''
      }
    const [newCenter,setNewCenter]=useState(defaultCenter)
    const getCenters=async()=>{
      const data=await fetch('http://localhost:3000/details/CENTER')
      const jsData=await data.json()
      setCenters(jsData)
      } 


    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(centers.some((c)=>{return (c.CID===Number(newCenter.CID))})){
            setError({message:'Center Id must be Unique!!!',isError:true})
        }else{
          await fetch('http://localhost:3000/details/CENTER',{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(newCenter)})
          setError({message:'',isError:false})
          setNewCenter(defaultCenter)
          await getCenters()
          console.log(process.env.hi)
        }
        
    }

    const deleteCenter=async(center)=>{
      await fetch('http://localhost:3000/details/CENTER',{method:'DELETE',headers:{'Content-Type': 'application/json'},body:JSON.stringify(center)});
      await getCenters();
    }
    useEffect(()=>{
      getCenters()
    },[])
    return (
      <> 
          <div className="overflow-x-auto my-10">
              <table className="table my-5 text-center table-fixed break-words">
                <thead>
                  <tr>
                    <th>CENTER ID</th>
                    <th>LOCATION</th>
                    <th>CONTACT_INFO</th>
                    <th>NUMBER OF VOLUNTEERS</th>
                    <th>NUMBER OF PETS</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                {centers.map((c)=>{console.log(c)
                  return(<tr key={c.CID}>
                    <td>{c.CID}</td>
                    <td>{c.LOCATION}</td>
                    <td>{c.CONTACT_INFO}</td>
                    <td>{c.NO_OF_VOLUNTEERS}</td>
                    <td>{c.NO_OF_PETS}</td>
                    <td><button className='btn btn-primary' onDoubleClick={async()=>{await deleteCenter(c)}}> Delete</button></td>
                  </tr>)
                  })
                  }
                </tbody>
              </table>
          </div>
          <h2>Add a center:</h2>
          <form className='flex justify-between pt-2' onSubmit={async (e)=>{await handleSubmit(e)}}>
              <input required value={newCenter.CID} onChange={(e)=>{setNewCenter({...newCenter,CID:e.target.value})}}type="number" placeholder="Enter Center ID" className="input input-bordered input-accent w-half max-w-xs" />
              <input required value={newCenter.LOCATION} onChange={(e)=>{setNewCenter({...newCenter,LOCATION:e.target.value})}}type="text" placeholder="Enter Location" className="input input-bordered input-accent w-half max-w-xs" />
              <input required value={newCenter.CONTACT_INFO} onChange={(e)=>{setNewCenter({...newCenter,CONTACT_INFO:e.target.value})}}type="email" placeholder="Enter Contact Info" className="input input-bordered input-accent w-half max-w-xs" />
              <button className='btn btn-primary'>Add</button>
          </form>
      </>
    )
}

export default CenterTable;
