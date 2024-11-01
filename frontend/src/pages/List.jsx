import React from 'react'
import { useAuth } from '../AuthContext'

const List = () => {
  const {user,logout} = useAuth();
  return (
    <div>
      {user && <h1>Welcome, {user}!</h1>}
      <button onClick={logout}>Logout</button>
      Welcome to List!
    </div>
  )
}

export default List