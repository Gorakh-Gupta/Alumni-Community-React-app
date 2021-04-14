import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Profile from './Profile'
function User(props) {
    const [users, setusers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/users/')
		.then((data)=>
		{console.log(data.data);
            users=setusers(data.data);
		})
		.catch((err)=>console.log("oh"+err))
    }, []);
    return (
        <div>
            <Profile users={users}/>
        </div>
    )
}

export default User