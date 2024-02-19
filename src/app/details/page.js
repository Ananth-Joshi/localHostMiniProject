'use client'
import {useState } from "react";
import PetTable from "../components/PetTable";
import TableChoose from "../components/TableChoose";
import AllocationTable from "../components/AllocationTable";
import CenterTable from "../components/CenterTable";
import DonationTable from "../components/DonationTable";
import VolunteersTable from "../components/VolunteersTable";
export default function Home() {

  const [table,setTable]=useState('pet')

  const switchTable=()=>{
    switch(table){
      case 'pet':
        return <PetTable/>
      case 'allocation':
        return <AllocationTable/>
      case 'center':
        return <CenterTable/>
      case 'donation':
        return <DonationTable/>
      case 'volunteers':
        return <VolunteersTable/>
      default:
        return <></>
    }
  }
  return (
    <div className="px-10 pt-5">
    <TableChoose changeTable={setTable}/>
    {
      switchTable()
    }
    </div>
  );
}
