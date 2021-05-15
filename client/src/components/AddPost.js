import axios from 'axios'
import React,{useContext,useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

function AddPost() {
    const {user}=useContext(AuthContext);
    const {name}=user;
    const id=user._id;
    const [content, setContent] = useState('');
    const submithandler=async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:8080/addpost',{id,name,content})
        .then(window.location.reload())
        .catch(e=>console.log(e));
    }
    return (
        <div style={{marginBottom:"10px"}}>
            <h6>{user.name}</h6>
            <h5>What's on Your Mind</h5>
           <Form onSubmit={submithandler} >
                <textarea rows="4" cols="60" value={content} onChange={(e)=>setContent(e.target.value)}>
                </textarea>
                <br></br>
                <Button variant="success" type="submit">
                    Share
                </Button>
           </Form>
        </div>
    )
}

export default AddPost
