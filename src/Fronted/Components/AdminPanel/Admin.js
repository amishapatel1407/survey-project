import React, { useEffect } from 'react'
import UsersDetails from './UsersDetails'
import { useDispatch } from 'react-redux'
import {Getuserlist} from '../../../Redux/Action/UserList'

export default function Admin() {
const dispatch = useDispatch()


    useEffect(() => {
        dispatch(Getuserlist())
    },[])
  return (
    <div>
      <UsersDetails />
    </div>
  )
}
