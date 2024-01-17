import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Badge, Button, Form, FormControl } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import CommunityHelper from './CommunityHelper';

function SinglePost(props) {
    const id = props.match.params.id;
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState({})
    const [comment, setComment] = useState('');
    useEffect(() => {
        async function fetchPost() {
            await axios.get('http://localhost:8080/post/' + id)
                .then((data) => setPost(data.data[0]))
                .catch((e) => console.log(e))
        }
        fetchPost();
    }, [])
    const likehandler = (async (id) => {
        await axios.get('http://localhost:8080/like/' + id)
            // .then((data)=>setPosts(data.data.reverse()))
            .catch((e) => console.log(e));
    })
    const unlikehandler = (async (id) => {
        await axios.get('http://localhost:8080/unlike/' + id)
            // .then((data)=>setPosts(data.data.reverse()))
            .catch((e) => console.log(e));
    })
    const commenthandler = (async (id) => {
        await axios.put('http://localhost:8080/addcomment/' + id, { comment })
            .then((data) => {
                // setPosts(data.data.reverse())
                setComment('');
            })
            .catch(e => console.log(e))
    })
    const deletehandler = (async (id) => {
        await axios.delete('http://localhost:8080/delete/' + id)
            // .then((data)=>setPosts(data.data))
            .catch(e => console.log(e))
    })
    return (
        <div style={{ marginLeft: 470, marginTop: 20 }}>
            {JSON.stringify(post) !== JSON.stringify({}) &&
                <div style={{ width: "500px", padding: "10px", border: "4px solid lightblue", marginTop: "10px" }}>
                    {post.user.name}
                    <h6>{post.time.slice(11, 16)}</h6>
                    <h5 style={{ marginBottom: "30px", marginTop: "20px" }}>{post.content}</h5>
                    {
                        post.likes.includes(user._id) ? <Button variant="primary" onClick={() => unlikehandler(post._id)}>Unlike</Button>
                            :
                            <Button variant="primary" onClick={() => likehandler(post._id)}>Like</Button>

                    }
                    <br></br>
                    <Badge pill variant="primary" style={{ marginTop: "10px" }}>
                        {post.likes.length} Likes
                    </Badge>{'      '}
                    <Badge pill variant="primary">{post.comments.length} Comments</Badge>
                    <br></br>
                    <Form style={{ marginTop: "10px", marginBottom: "10px" }} inline onSubmit={(e) => {
                        commenthandler(post._id)
                        e.preventDefault();
                    }
                    }>
                        <FormControl type="text" required placeholder="Your comment" value={comment} className="mr-sm-2" onChange={(e) => setComment(e.target.value)} />
                        <Button variant="outline-primary" type="submit">Add comment</Button>
                    </Form>
                    {post.comments.map((comment) => {
                        return (
                            <div >

                                <Badge variant="primary">{comment.roll}</Badge>
                                &emsp;{comment.comment}

                            </div>
                        )
                    })}
                    {post.user.roll === user.roll && <a href="#" onClick={() => deletehandler(post._id)}>Delete Post</a>}
                </div>
            }
        </div>
    )
}

export default SinglePost
