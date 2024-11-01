import React from 'react'
import { useAuth } from '../AuthContext'

const List = () => {
  const {user} = useAuth();
  return (
    <div>
      {user && <h1>Welcome, {user}!</h1>}
      Welcome to List!
    </div>
  )
}

export default List