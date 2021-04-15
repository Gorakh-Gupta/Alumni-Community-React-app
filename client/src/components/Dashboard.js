import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Profile from './Profile'
function Dashboard(props) {
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function fetchMyAPI()
        {
            await axios.get('http://localhost:8080/users/'+props.match.params.id)
            .then((users)=>
            {
                user=setUser(users.data);
            })
            .catch((err)=>console.log("oh"+err))
        }
        fetchMyAPI();
    }, [])
    console.log(user);
  return (
    <div>
        {!user && <p>Loading</p>}
      {user.length>0 && <div><p>Welcome {user[0].name}</p><h1>{user[0].roll}</h1></div>}
      {user.length && <Profile users={user}/>}
      <h1>hi</h1>
    </div>
  );
}
export default Dashboard;