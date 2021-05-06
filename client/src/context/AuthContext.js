import React, {useState,createContext,useEffect} from 'react'
import axios from 'axios'
const AuthContext=createContext();
function AuthContextProvider(props) {
    const [loggedUser, setLoggedUser] = useState(undefined);
    async function getLogged()
    {
        const loggedRes=await axios.get('http://localhost:8080/users/loggedIn')
        setLoggedUser(loggedRes.data);
    }
    useEffect(() => {
        getLogged();
    }, [])
    return (
        <AuthContext.Provider value={{loggedUser,getLogged}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export {AuthContextProvider};
