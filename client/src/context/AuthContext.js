import React, {useState,createContext,useEffect} from 'react'
import axios from 'axios'
const AuthContext=createContext();
function AuthContextProvider(props) {
    const [loggedUser, setLoggedUser] = useState(undefined);
    const [loggedAdmin, setLoggedAdmin] = useState(undefined);
    const [user, setUser] = useState({});
    async function getLogged()
    {
        const loggedRes=await axios.get('http://localhost:8080/users/loggedIn')
        .then((data)=>{
            if(!data.data.msg)
            {
                setLoggedUser(true);
            }  
            else
            {
                setLoggedUser(false);
            }
        })
        .catch(e=>console.log(e))
        await axios.get('http://localhost:8080/users/loggeduser')
        .then(data=>setUser(data.data))
        .catch(e=>console.log(e))
    }
    async function getLoggedAdmin()
    {
        const loggedRes=await axios.get('http://localhost:8080/admin/loggedIn')
        .then((data)=>{
            if(!data.data.msg)
            {
                setLoggedAdmin(true);
            }  
            else
            {
                setLoggedAdmin(false);
            }
        })
        .catch(e=>console.log(e))
    }
    useEffect(() => {
        getLogged();
        getLoggedAdmin();
    }, [])
    return (
        <AuthContext.Provider value={{loggedUser,getLogged,user,loggedAdmin,getLoggedAdmin}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider};
