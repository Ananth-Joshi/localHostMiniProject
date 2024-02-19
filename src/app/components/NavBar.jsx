import React from 'react'
import { useRouter } from 'next/navigation'
function NavBar() {
  const router =useRouter()
  return (
    <div className="navbar bg-base-100">
        <div className="flex-1">
          <div onClick={()=>{router.push("/")}}className="btn btn-ghost text-xl">Pet Pals</div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><div onClick={()=>router.push('/details')}>Database</div></li>
            <li><div onClick={()=>router.push('/about')}>About Us</div></li>
          </ul>
        </div>
    </div>
  )
}

export default NavBar
