import React,{useState,useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Profile from './Profile'
import FormControl from 'react-bootstrap/FormControl'
function Search() {
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
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
        <div>
            <Form onSubmit={submithandler}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Search Alumni</Form.Label>
            <Form.Control type="text" placeholder="Enter name to search" required value={name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        <Profile users={users} fetch={refresh}/>
        </div>
    )
}

export default Search
