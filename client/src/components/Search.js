import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Profile from './Profile'
import FormControl from 'react-bootstrap/FormControl'
import { Table } from 'react-bootstrap'
function Search() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    let i=1;
    const submithandler=(e)=>{
        e.preventDefault();
        async function fetchData()
        {
            await axios.get(`http://localhost:8080/admin/search/?q=${name}`)
            .then((data)=>setUsers(data.data))
            .catch((err)=>console.log(err))
        }
        fetchData();
    }
    const refresh=()=>{
        async function fetchData()
        {
            await axios.get(`http://localhost:8080/admin/search/?q=${name}`)
            .then((data)=>setUsers(data.data))
            .catch((err)=>console.log(err))
        }
        fetchData();
    }
    return (
        <div style={{margin:"10px"}}>
            <Form style={{width:400,marginLeft:500,marginTop:10,marginBottom:"20px"}} onSubmit={submithandler}>
        <Form.Group controlId="formBasicEmail">
            <h2 style={{textAlign:'center'}}>Search Alumni</h2>
            <Form.Control type="text" placeholder="Enter name to search" required value={name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" className="btn btn-primary btn-block" type="submit">
            Search
        </Button>
        </Form>
        {/* <Profile users={users} fetch={refresh}/> */}
        {users.length>0 &&
        <Table striped bordered hover variant="dark">
        <thead>
            <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Roll</th>
            <th>Branch</th>
            <th>Graduation Year</th>
            <th>Email</th>
            <th>Photo</th>
            </tr>
        </thead>
        <tbody>
        {users.map((user)=>{
            return (
                            <tr>
                            <td>{i++}</td>
                            <td>{user.name}</td>
                            <td>{user.roll}</td>
                            <td>{user.branch}</td>
                            <td>{user.year}</td>
                            <td>{user.mail}</td>
                            <td><img style={{width:"60px",height:"60px"}} src={user.photo.url}></img></td>
                            <td><a href="#">Full Profile</a></td>
                            </tr>
            )
        })}
        </tbody>
        </Table>
        }
        </div>
    )
}

export default Search
