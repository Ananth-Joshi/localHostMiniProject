import React from 'react'

function TableChoose(props) {
  return (
    <select className="select select-primary w-full max-w-xs" onChange={(e)=>props.changeTable(e.target.value)}>
    <option value='pet'>PET</option>
    <option value='center'>CENTER</option>
    <option value='allocation'>ALLOCATION</option>
    <option value='donation'>DONATION</option>
    <option value='volunteers'>VOLUNTEERS</option>
  </select>

  )
}

export default TableChoose
