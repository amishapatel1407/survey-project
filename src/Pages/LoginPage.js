import React from 'react'
import { Login } from '../Fronted/Components'

export default function LoginPage(props) {
 const {setIsLoggedIn ,isAllowed} = props


   
  return (
    <div>
      <Login  setIsLoggedIn={setIsLoggedIn} isAllowed={isAllowed}/>
    </div>
  )
}
