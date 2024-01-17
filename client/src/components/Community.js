import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import AddPost from './AddPost';
import authContext from '../context/AuthContext';
import { Badge, Button, Form, FormControl, Image } from 'react-bootstrap'
import CommunityHelper from './CommunityHelper';
function Community() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        await axios.get('http://localhost:8080/allposts')
            .then((data) => setPosts(data.data.reverse()))
            .catch((e) => console.log(e))
    }, [posts])

    return (

        <div style={{ marginLeft: 470, marginTop: 20 }}>
            <AddPost />
            {posts.length === 0 && <h3>Loading Posts</h3>}
            {posts.map((post) => {
                return (
                    <CommunityHelper post={post} />
                )
            })}

        </div>
    )
}

export default Community
