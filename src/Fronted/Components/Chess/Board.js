import React from 'react'
import { useState } from 'react';

export default function Board() {

  const amisha = ['amisha', 'nirali', 'anjali']
  const [state, setstate] = useState(null)

  console.log("beforepush", amisha);


  const handlecreate = (e) => {
    setstate(e.target.value)



  }
  const handlesubmit = (values) => {
    console.log("values==>", values);

  }

  return (
    <div>
      <input onChange={handlecreate} />
      <button onClick={handlesubmit}>create</button>
    </div>

  )



}
