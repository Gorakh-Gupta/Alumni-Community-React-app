import React ,{useState, useEffect,useContext}from 'react'
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AddPost from './AddPost';
import authContext from '../context/AuthContext';
import {Badge,Button, Form, FormControl, Image} from 'react-bootstrap'
import { Card } from '@material-ui/core';
import CommunityHelper from './CommunityHelper';
function Community() {
    // const {user}=useContext(authContext);
    const [posts, setPosts] = useState([]);
    // const [comment, setComment] = useState('');
    useEffect(async () => {
       await axios.get('http://localhost:8080/allposts')
       .then((data)=>setPosts(data.data.reverse()))
       .catch((e)=>console.log(e))
    }, [posts])
    // const likehandler=(async (id)=>{
    //     await axios.get('http://localhost:8080/like/'+id)
    //     .then((data)=>setPosts(data.data.reverse()))
    //     .catch((e)=>console.log(e));
    // })
    // const unlikehandler=(async (id)=>{
    //     await axios.get('http://localhost:8080/unlike/'+id)
    //     .then((data)=>setPosts(data.data.reverse()))
    //     .catch((e)=>console.log(e));
    // })
    // const commenthandler=(async (id)=>{
    //         await axios.put('http://localhost:8080/addcomment/'+id,{comment})
    //         .then((data)=>{
    //             setPosts(data.data.reverse())
    //             setComment('');
    //         })
    //         .catch(e=>console.log(e))
    // })
    // const deletehandler=(async (id)=>{
    //     await axios.delete('http://localhost:8080/delete/'+id)
    //     .then((data)=>setPosts(data.data))
    //     .catch(e=>console.log(e))
    // })
    return (
        
        <div style={{marginLeft:470,marginTop:20}}>
           <AddPost />
           {posts.length===0 && <h3>Loading Posts</h3>}
           {posts.map((post)=>{
               return (
                //    <div style={{width:"500px",padding:"10px",border:"4px solid lightblue",marginTop:"10px"}}>
                //     {post.user.name}                  
                //     <h6>{post.time.slice(11,16)}</h6>
                //    <h5 style={{marginBottom:"30px",marginTop:"20px"}}>{post.content}</h5>
                //    {
                //        post.likes.includes(user._id)?<Button variant="primary"  onClick={()=>unlikehandler(post._id)}>Unlike</Button>
                //        :
                //        <Button variant="primary"  onClick={()=>likehandler(post._id)}>Like</Button> 
                
                //    }
                //     <br></br>
                //     <Badge pill variant="primary" style={{marginTop:"10px"}}>
                //     {post.likes.length} Likes
                //     </Badge>{'      '}
                //     <Badge pill variant="primary">{post.comments.length} Comments</Badge>
                //    <br></br> 
                //    <Form style={{marginTop:"10px",marginBottom:"10px"}} inline onSubmit={(e)=>{
                //        commenthandler(post._id)
                //        e.preventDefault();
                //        }
                //        }>
                //            <FormControl type="text" required placeholder="Your comment"  value={comment}  className="mr-sm-2" onChange={(e)=>setComment(e.target.value)}/>
                //         <Button variant="outline-primary" type="submit">Add comment</Button>   
                //    </Form>
                //    {post.user.roll===user.roll && <a href="#" onClick={()=>deletehandler(post._id)}>Delete Post</a>}
                //    &emsp;
                //    &emsp;
                //    &emsp;
                //    <a href={`/post/${post._id}`}>All comments</a>
                //    </div>
                <CommunityHelper post={post}/>
               )
           })}







           
        </div>
    )
}

export default Community
