import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostJob from '../../components/employer/PostJob'
import EmployerNav from '../../components/employer/EmployerNav';

function JobPost() {
  return (
   <>
      <EmployerNav/>
      <Row className='justify-content-center mt-5 pt-5' >
       <Col lg={7}>        
       <PostJob/>
       </Col>

      </Row>
 </>
  );
}

export default JobPost;