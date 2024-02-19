export const getCID=async()=>{
    const resObj=await fetch(`http://localhost:3000/details/CENTER`);
    const res=await resObj.json()
    const cidArray=res.map((x)=>x.CID)
    return cidArray
}

export const getVID=async()=>{
    const resObj=await fetch(`http://localhost:3000/details/VOLUNTEERS`);
    const res=await resObj.json()
    const vidArray=res.map((x)=>x.V_ID)
    return vidArray
}

export const getDonationIds=async()=>{
    const resObj=await fetch(`http://localhost:3000/details/DONATION`);
    const res=await resObj.json()
    const dIdArray=res.map((d)=>d.DONATION_ID)
    return dIdArray
}