import React,{useEffect,useContext,useState} from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import AuthContext from '../../context/authContext';
import JobContext from "../../context/jobContext";
import axios from '../../axios'
import Button from 'react-bootstrap/Button';
import { Navigate, useNavigate} from 'react-router-dom'
import ImS from '../../img/empty.png'
import Pagination from './Pagination'
function Jobs() {
    const navigate = useNavigate()
    
    const [jobDetail, setJobDetail] = useState('')
    const [search, setSearch] = useState('')
    const [found, setFound] = useState(0)

    const [category, setCategory] = useState([])
    const [location, setLocation] = useState([])
    

    const {authTokens} = useContext(AuthContext)
    const {getJobHandler,job,setJob} = useContext(JobContext)

    const [filter, setFilter] = useState('b')
    const [loc, setLoc] = useState('a')
    

    //pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(4)
    const lastPostIndex = currentPage*postPerPage
    const firstPostIndex = lastPostIndex-postPerPage
    const currentPost = job.slice(firstPostIndex,lastPostIndex)

        useEffect(() => {
        getJobHandler()
        catHandler()
        locHandler()

    }, [])
    
    
    const  addtofilter=(b,id)=>{
      
       
          console.log('kk')
          console.log(filter,'pipi',id,'pppopopo')
          var f=filter.includes(id)
          console.log("nokk",f)
          if (f){
            console.log('removing ')
            setFilter(filter.replace(id,''))
          }else{
            setFilter(filter + id)
          }
        
          
      }
      const  addtoLfilter=(b,id)=>{
      
       
        console.log('kk')
        console.log(filter,'pipi',id,'pppopopo')
        var f=loc.includes(id)
        console.log("nokk",f)
        if (f){
          console.log('removing ')
          setLoc(loc.replace(id,''))
        }else{
          setLoc(loc + id)
        }
      
        
    }
      //api call for search
     const searchHandler=async()=>{
        await axios.get('employer/job_/?search=',{params:{search:search}},
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
            console.log(response.data,"qualifications")
            if (response.status === 200) {
                console.log(response.data,"search result")
                setJob(response.data)
                setFound(response.data.length)
            }
            
           
          }).catch((err)=>{
            console.log(err.response.data.detail,"erorr")
            
          })
  
      }

           //api call for getting category
     const catHandler = async(e)=>{   
     
        await axios.get('employer/job_categories/',
        {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
           console.log(response.data)
           if (response.status===200){
             setCategory(response.data)
             console.log("success")
           }
         })  
         .catch((err)=>{
           console.log(err.response.data.detail,"error category")
        
         }) 
       
         
       }

             //api call for getting locations
     const locHandler = async(e)=>{   
     
      await axios.get('employer/location/',
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
         console.log(response.data)
         if (response.status===200){
           setLocation(response.data)
           console.log("success locccc")
         }
       })  
       .catch((err)=>{
         console.log(err.response.data.detail,"error category")
      
       }) 
     
       
     }


    //api call for getting filtered job
     const filterHandler = async(e)=>{   
     
      await axios.get(`employer/filter/${filter}/${loc}/`,
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
         console.log(response.data)
         if (response.status===200){ 
           console.log(response.data,'kkkkk')
           setJob(response.data)
         }
       })  
       .catch((err)=>{
         console.log(err.response.data.detail,"error category")
      
       }) 
     
       
     }

    

  return (
    <div>
        <Row className='p-5'>

            <Col  lg={10} >
           <input onKeyDown={e => e.key === 'Enter' && searchHandler()} 
        onChange={(e)=>setSearch(e.target.value)} type="text"
        style={{width:'100%', marginRight:'20px',height:'100%'}}
        placeholder=' Search for a job or place...' />
        
            </Col>
            <Col  lg={2}>
            <Button style={{width:'100%',height:'100%',backgroundColor:'grey',border:'none'}} 
             onClick={searchHandler} >Search</Button>
            </Col>
        </Row>
     
    
        
        <Row className='mx-5 p-5'>
            <Col sm={12} lg={3}>
            <Card style={{width:'90%'}}>
     
      <Card.Body><br/>
        <Card.Subtitle style={{color:'green'}} className="mb-2 ">
          FILTER  YOUR PREFERENCES
        </Card.Subtitle><br/>
        <p style={{color:'grey',fontWeight:'bolder'}}>Job Categories</p>
            {
                category.map((obj)=><>
                <input type="checkbox" id={obj.id} name="vehicle1" 
                value={obj.id}  onChange={(e)=>addtofilter(e.target.checked,obj.id)} />{' '}
                <label for="vehicle1"> {obj.job_category}</label><br/><br/></>
                )
            }
       <br/>
       <p style={{color:'grey',fontWeight:'bolder'}}>Locations</p>
       {
               location.map((obj)=><>
               <input type="checkbox" id={obj.id} name="vehicle1" 
               value={obj.id}  onChange={(e)=>addtoLfilter(e.target.checked,obj.id)} />{' '}
               <label for="vehicle1"> {obj.location}</label><br/><br/></>
               )
           }
 <Button style={{backgroundColor:'rgba(9, 10, 90, 0.979)'}} onClick={filterHandler} variant="primary">Filter</Button>
        
      </Card.Body>
    </Card>

  
    

            </Col>
            <Col lg={9}  >
             { job.length>0 ?
                    currentPost.map((obj)=>
                    obj.status === 'Active' &&
                    <>
                   
                    <Card className='mb-5'
                     onClick={()=>navigate(`/jobs/${obj.id}`)}  style={{border:'none',width:'100%'}} > 
            <Card.Body>
                <Card.Title>{obj.designation[0].toUpperCase() + obj.designation.slice(1).toLowerCase()} </Card.Title>
                <Card.Subtitle  className="mb-2 text-muted">{obj.category.job_category.toUpperCase()}</Card.Subtitle>
                {job &&   <Card.Text>
                    {obj.location.location} 
                </Card.Text> }
                <Card.Text>
                {obj.company.company_name}
                </Card.Text>
                <Badge bg="secondary">PAYSCALE FROM {obj.payscale_from}LPA TO {obj.payscale_to}LPA</Badge>
                {' '}<Badge bg="secondary">{obj.type}</Badge>
                {' '}<br/><Badge bg="secondary">{obj.workmode}</Badge>

            </Card.Body>
            </Card></> 

                    )
              :<div align='center' style={{alignItems:'center',justifyContent:'center'}}>
                <h2 style={{color:'rgba(9, 10, 90, 0.979)'}}>Nothing Found!!</h2><br/><br/><br/>
                <img  style={{width:'40%',height:'100%'}} src={ImS}  /> 
              </div>  }
             {
              job.length>4 &&
              <Pagination
                    totalPosts={job.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    />}
          
            </Col>
           

        </Row>
    </div>
  )
}

export default Jobs