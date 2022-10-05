import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/user/NavBar'
import SkillSet from '../../components/user/SkillSet';
import './loginpage.css'


function skillSetPage() {
  return (
    <div>
    
     <NavBar/>   
    <SkillSet/>
    </div>
  )
}

export default skillSetPage