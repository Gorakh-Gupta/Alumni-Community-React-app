import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
function Profile(props) {
    const users=props.users;
    const clickhandler=(roll)=>{
        if(window.confirm('Are you sure you want to delete '+roll))
        {   
            axios.delete(`http://localhost:8080/admin/delete/${roll}`)
            .then((data)=>{
                if(data.status==200)
                {
                    props.fetch();
                }
            })
            .catch((err)=>console.log(err))
        }
    }
    return (
        <div>
            {users.map((user)=>{
                return (
                <div className="profile">
                <h4>{user.name}</h4>
                <h4>{user.roll}</h4>
                <h4>{user.mob}</h4>
                <Link to={"/update/"+user.roll}><Button>Update</Button></Link>  
                <Button onClick={()=>clickhandler(user.roll)}>Delete</Button> 
                </div>)
            })}
        </div>
    )
}

export default Profile
