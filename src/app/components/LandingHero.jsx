import React from 'react'
import Link from 'next/Link'
function LandingHero() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7e96b05a-fb91-4e51-85c3-41ea3ca79ea5/d7snsl0-64a5d9df-0526-4509-bf78-cc33625f4386.jpg/v1/fit/w_605,h_400,q_70,strp/hitler_cat_by_eyelesssam96_d7snsl0-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDAwIiwicGF0aCI6IlwvZlwvN2U5NmIwNWEtZmI5MS00ZTUxLTg1YzMtNDFlYTNjYTc5ZWE1XC9kN3Nuc2wwLTY0YTVkOWRmLTA1MjYtNDUwOS1iZjc4LWNjMzM2MjVmNDM4Ni5qcGciLCJ3aWR0aCI6Ijw9NjA1In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.jzDBZv8QLgfqA0eEFOp2iEoULiJlCKBUEHI60qsk7qM'}}>
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
              <p className="mb-5">Our Open source list of Animal rescue centers helps you find the nearest rescue centers and register yourself as a volunteer. </p>
              <Link href={"#getStarted"}><button className="btn btn-primary">Get Started</button></Link>
            </div>
          </div>
    </div>
  )
}

export default LandingHero
