import React,{useState,useEffect,useContext,PureComponent} from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend,ResponsiveContainer} from 'recharts';
import AuthContext from '../../context/authContext';
import axios from '../../axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};






function Dash() {
  const [data, setData] = useState('')
  const {authTokens} = useContext(AuthContext)
  const [datab, setDatab] = useState('')

  useEffect(() => {
    getComHandler()
    getPlanHandler()
  }, [])
  

  // api call for getting company
  const getComHandler=async()=>{
    console.log('kkk')
    await axios.get('employer/pie/',
    {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
        console.log(response.data,"application")
        if (response.status === 200) {
            console.log(response.data,"application")
            setData(response.data)
           
        }
        
       
      }).catch((err)=>{
        console.log(err.response.data.detail,"erorr")
      })

  }
  
    // api call for getting company
    const getPlanHandler=async()=>{
      console.log('kkk')
      await axios.get('employer/bar/',
      {headers:{Authorization:`Bearer ${authTokens?.token}`}} ).then((response)=>{
          console.log(response.data,"application")
          if (response.status === 200) {
              console.log(response.data,"application")
              setDatab(response.data)
             
          }
          
         
        }).catch((err)=>{
          console.log(err.response.data.detail,"erorr")
        })
  
    }

 const COLORS = ["#8884d8", "#82ca9d", "#FFBB28", "#FF8042", "#AF19FF",'#83C825'];
    
  return (
    <div>
      <Row>
        <Col  lg={6}>
          <h3  className='mt-5' align='center'>Job Oppurtunity distribution</h3>
        <PieChart width={550} height={550}>
        
        <Pie data={data} dataKey="count"  cx="50%" isAnimationActive={false}  
        label={renderCustomizedLabel}
          nameKey="category" outerRadius={200} 
       cy="50%"   >
      { data && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))} 
       </Pie>
        
        <Tooltip />
        <Legend/>
      </PieChart>
        </Col>

      
        <Col  lg={6}>
          <h3  className='mt-5 mb-5 pb-5' align='center'>Plan VS Purchase count</h3>
        
         
        <BarChart  className='mt-5 '
          width={500}
          height={400}
          data={datab}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Bar dataKey="amount" fill="#8884d8" /> */}
          <Bar dataKey="purchase count" fill="#82ca9d" />
          
      
        </BarChart>
      



        </Col>

       
      </Row>
       
        

    </div>
  )
}

export default Dash