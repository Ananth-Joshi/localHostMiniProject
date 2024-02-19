import React from 'react'

function DetailsCard({imageLink,heading,text}) {
  return (
    <div className="card w-1/3 mx-auto my-5 card-side bg-base-100 shadow-xl">
      <figure><img src={imageLink} alt="Image"/></figure>
      <div className="card-body">
        <h2 className="card-title">{heading}</h2>
        <p>{text}</p>
      </div>
</div>

  )
}

export default DetailsCard
