import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import Profile from './Profile'
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
          <Nav.Link eventKey="https://www.google.com">Conversation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Logout</Nav.Link>
        </Nav.Item>
      </Nav>
      {!user && <h4>Loading</h4>}
      {user.length>0 && <div><p><h1>Welcome {user[0].name}</h1></p></div>}
      {/* {user.length && <Profile users={user}/>} */}
      {user.length && 
      
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://static.toiimg.com/thumb/msid-73540687,width-800,height-600,resizemode-75,imgsize-575035,pt-32,y_pad-40/73540687.jpg" />
        <Card.Body>
          <Card.Title>{user[0].name}</Card.Title>
          <Card.Text>
            <h3>Roll no: {user[0].roll}</h3>
            <h3>Branch: {user[0].branch}</h3>
            <h6>Year of Graduation:{user[0].year}</h6>
            <h6>Mobile:{user[0].mob}</h6>
            <h6>Email:{user[0].mail}</h6>
          </Card.Text>
          <Button variant="primary">Profile Details</Button>
        </Card.Body>
    </Card>
      }
        
    </div>
  );
}
export default Dashboard;