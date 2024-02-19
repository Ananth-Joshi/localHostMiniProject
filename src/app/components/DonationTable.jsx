'use client'
import {useContext, useEffect, useState} from 'react'
import { ErrorContext } from '../contexts/ErrorContext'
import { getDonationIds } from '../db/functions'


function DonationTable() {
  const [donations,setDonations]=useState([])
  const setError=useContext(ErrorContext)
  const defaultNewDonation={
    DONATION_ID:'',
    NAME:'',
    PH_NO:'',
    PAYMENT_INFO:'',
    AMOUNT:'',
}
  const [newDonation,setNewDonation]=useState(defaultNewDonation)
  const getDonations=async()=>{
    const data=await fetch('http://localhost:3000/details/DONATION').then((x)=>{return x.json()})
    setDonations(data)
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  const donationIdArray=await getDonationIds();
  if(donationIdArray.some((d)=>{return d===Number(newDonation.DONATION_ID)})){
      setError({message:'Donation Id must be Unique!!!',isError:true})
  }else{
    await fetch('http://localhost:3000/details/DONATION',{method:'POST',headers:{'Content-Type': 'application/json'},body:JSON.stringify(newDonation)})
    setError({message:'',isError:false})
    setNewDonation(defaultNewDonation)
    await getDonations()
  }
  
}

const deleteDonation=async(donation)=>{
  await fetch('http://localhost:3000/details/DONATION',{method:'DELETE',headers:{'Content-Type': 'application/json'},body:JSON.stringify(donation)});
  await getDonations();
}
  useEffect(()=>{
    getDonations()
  },[])
  return (
    <>
    <div className="overflow-x-auto my-10">
      <table className="table text-center table-fixed break-words my-5">
        <thead>
          <tr>
            <th>DONATION ID</th>
            <th>NAME</th>
            <th>PHONE NUMBER</th>
            <th>PAYMENT INFO</th>
            <th>AMOUNT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
        {donations.map((d)=>{
          return(<tr key={d.DONATION_ID}>
            <td>{d.DONATION_ID}</td>
            <td>{d.NAME}</td>
            <td>{d.PH_NO}</td>
            <td>{d.PAYMENT_INFO}</td>
            <td>{d.AMOUNT}</td>
            <td><button onDoubleClick={async()=>{await deleteDonation(d)}} className='btn btn-primary'>Delete</button></td>
          </tr>)
          })
          }
        </tbody>
      </table>
      <h2>Add a Donation:</h2>
      <form className='flex justify-between gap-y-2 pt-2 flex-wrap col-span-1' onSubmit={async (e)=>{await handleSubmit(e)}}>
          <input required value={newDonation.DONATION_ID} onChange={(e)=>{setNewDonation({...newDonation,DONATION_ID:e.target.value})}}type="number" placeholder="Enter Donation ID" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newDonation.NAME} onChange={(e)=>{setNewDonation({...newDonation,NAME:e.target.value})}}type="text" placeholder="Enter Name" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newDonation.PH_NO} onChange={(e)=>{setNewDonation({...newDonation,PH_NO:e.target.value})}}type="text" placeholder="Enter Phone Number" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newDonation.PAYMENT_INFO} onChange={(e)=>{setNewDonation({...newDonation,PAYMENT_INFO:e.target.value})}}type="text" placeholder="Enter Payment Info" className="input input-bordered input-accent w-half max-w-xs" />
          <input required value={newDonation.AMOUNT} onChange={(e)=>{setNewDonation({...newDonation,AMOUNT:e.target.value})}}type="number" placeholder="Enter Amount" className="input input-bordered input-accent w-half max-w-xs" />
          <button className='btn btn-primary'>Add</button>
      </form>
  </div>
  </>
  )
}

export default DonationTable;
