import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import Profile from './Profile'
import ChangeProfile from './ChangeProfile';
import NewProfile from './NewProfile';
function Dashboard(props) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchMyAPI()
        {
            await axios.get('http://localhost:8080/users/'+props.match.params.id)
            .then((users)=>
            {
                user=setUser(users.data);
            })
            .catch((err)=>console.log("oh"+err))
        }
        fetchMyAPI();
    }, [])
    console.log(user);
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
          <Nav.Link href="/search">Raise a Fund/Seek Help</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/changepassword/${props.match.params.id}`}>Change Password</Nav.Link>
        </Nav.Item>
        <NavDropdown title="More" id="nav-dropdown">
        <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4">Log Out</NavDropdown.Item>
      </NavDropdown>
      </Nav>
      {!user && <h4>Loading</h4>}
      {user.length>0 && <div><p><h1>Welcome {user[0].name}</h1></p></div>}
      {/* {user.length && <Profile users={user}/>} */}
      {user.length && 
      
      <Card style={{ width: '18rem' }}>
         <Card.Img variant="top" src={user[0].photo.url} />
        <Card.Body>
          <Card.Title>{user[0].name}</Card.Title>
          <Card.Text>
            <h3>Roll no: {user[0].roll}</h3>
            <h3>Branch: {user[0].branch}</h3>
            <h6>Year of Graduation:{user[0].year}</h6>
            <h6>Mobile:{user[0].mob}</h6>
            <h6>Email:{user[0].mail}</h6>
            {user[0].designation && <h6>Designation:{user[0].designation}</h6>}
            {user[0].organization && <h6>Organization:{user[0].organization}</h6>}
          </Card.Text>
          <Button variant="primary" onClick={()=>props.history.push("/Changeprofile/"+props.match.params.id)}>Update Profile Photo</Button>
        </Card.Body>
    </Card>
      }
        
    </div>
  );
}
export default Dashboard;