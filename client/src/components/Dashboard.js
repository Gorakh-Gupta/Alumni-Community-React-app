import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import About from './About';
import Notice from './Notice';
function Dashboard(props) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchMyAPI()
        {
            await axios.get('http://localhost:8080/users/'+props.match.params.id)
            .then((users)=>
            {
                setUser(users.data);
            })
            .catch((err)=>console.log("oh"+err))
        }
        fetchMyAPI();
    }, [])
  const outhandler=async ()=>{
    await axios.get('http://localhost:8080/users/logout')
    .then(()=>props.history.push('/'))
    .catch((err)=>console.log(err));
  }
  return (
    <div>
      <Nav fill variant="tabs" defaultActiveKey={'/dashboard/'+props.match.params.id}>
        <Nav.Item>
          <Nav.Link href={'/dashboard/'+props.match.params.id}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={'/update/'+props.match.params.id}>Update</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/search">Search an Alumni</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/community">COMMUNTY</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/changepassword/${props.match.params.id}`}>Change Password</Nav.Link>
        </Nav.Item>
        <NavDropdown title="More" id="nav-dropdown">
        <NavDropdown.Item href="/faq" eventKey="4.1">FAQ</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={outhandler}>Log Out</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      {user.length===0 && <h4>Loading</h4>}
      {user.length>0 && 
      <center>
      <Card style={{ width: '45rem' ,borderStyle:"solid",marginTop:"20px"}}>
          <center>
          <Card.Img variant="top" src={user[0].photo.url} alt="Add image here" style={{height:"20vh",width:"160px",overflow:"hidden",marginTop:"20px"}}/>
          </center>
               <Card.Body>
               <Button variant="primary" onClick={()=>props.history.push("/Changeprofile/"+props.match.params.id)}>Update Profile Photo</Button>
                {/* <Card.Title>Profile</Card.Title> */}
                <hr/>
                  <Card.Text>
                    <table>
                      <tr>
                  <td style={{paddingRight:"20px"}}>Name : {user[0].name}</td>
                  <td >Roll : {user[0].roll}</td>
                      </tr>
                    <tr>
                  <td style={{paddingRight:"20px"}}>Year of Graduation : {user[0].year}</td>   
                  <td>Branch : CSE</td> 
                     </tr>
                     <tr>
                  <td style={{paddingRight:"20px"}}>Mobile No. {user[0].mob}</td>
                  <td>Mail :{user[0].mail}</td>
                      </tr>
                    <tr>
                  <td style={{paddingRight:"20px"}}>Designaation : {user[0].designation}</td>   
                  <td>Orgnization : {user[0].organization}</td> 
                     </tr>   
                    </table>
                  </Card.Text>
                  <p style={{borderStyle:"solid",backgroundColor:"ivory",height:"25vh",overflowY:"scroll"}}>
                    <b>BIO</b>
                    <hr/>
                    {user[0].bio}
                  </p>
               </Card.Body>
       </Card>
       </center>
      }
    {/* <div style={{ display: "flex" }}>
           <div style={{width: "60%"}}>
           <About/>
           </div>
           <div style={{
            width: "40%",
            maxHeight:"100vh",
            background: "#f0f0f0"
            }}>
           <Notice/>
           </div>
      </div> */}
    </div>
  );
}
export default Dashboard;