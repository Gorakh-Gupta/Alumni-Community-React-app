import React,{useState,useEffect} from 'react'
import { Button, Col, Form, Jumbotron, Row } from 'react-bootstrap'
import axios from 'axios'
import AnswerFaqHelper from './AnswerFaqHelper'
function AnswerFaq() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        async function fetchPost()
        {
            await axios.get('http://localhost:8080/admin/noanswerfaq')
            .then((data)=>setPosts(data.data))
            .catch((e)=>console.log(e))
        }
        fetchPost();
    }, [])
    return (
        <div style={{width:"1000px",margin:"100px",marginLeft:"220px",marginTop:"50px"}}>
            <h1 style={{textAlign:'center'}}>Answer Frequently Asked Questions</h1>
            <Jumbotron>
            
            {posts.length>0 && posts.map((post)=>{
                return (
                    <AnswerFaqHelper post={post}/>
                )
            })}
            </Jumbotron>
        </div>
    )
}

export default AnswerFaq
