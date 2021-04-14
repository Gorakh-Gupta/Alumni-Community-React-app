import React from 'react'
import {Link} from 'react-router-dom'
function Profile(props) {
    const users=props.users;
    return (
        <div>
            {users.map((user)=>{
                return (
                <div className="profile">
                <h4>{user.name}</h4>
                <h4>{user.roll}</h4>
                <h4>{user.mob}</h4>
                <Link to={"/edit/"+user.roll}>Update</Link>  
                <Link to={"/delete/"+user.roll}>Delete</Link>  
                </div>)
            })}
        </div>
    )
}

export default Profile
