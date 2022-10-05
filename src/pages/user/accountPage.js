import React from 'react'
import Account from '../../components/user/Account'
import Account2 from '../../components/user/Account2'
import Account3 from '../../components/user/Account3'
import NavBar from '../../components/user/NavBar'

function accountPage() {
  return (
    <div>
        <NavBar/>
        <Account/>
        <Account2/>
        <Account3/>
    </div>
  )
}

export default accountPage