import React from 'react'
import { useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";


export default function Protected({ isallowed1, children, redirectPath }) {
console.log("isallowed1",isallowed1);


  if (!isallowed1) {

    return <Navigate to={redirectPath} />

  }
  // if (isAllowed1) {
  //   return <Navigate to='/home' />

  // }
  return children ? children : <Outlet />;
}
