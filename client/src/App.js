import React from 'react'
// import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
// import Login from './components/Login'
// import Signup from './components/Signup'
// import Dashboard from './components/Dashboard'
// import User from './components/User'
// import Update from './components/Update'
// import ChangeProfile from './components/ChangeProfile'
// import Search from './components/Search'
// import SearchBy from './components/SearchBy'
// import NotableAlumni from './components/NotableAlumni'
// import SubmitNotable from './components/SubmitNotable'
// import ChangePassword from './components/ChangePassword'
// import Community from './components/Community'
// import Reset from './components/Reset'
// import ResetPass from './components/ResetPass'
// import UpdateByAdmin from './components/UpdateByAdmin'
// import SignupAdmin from './components/SignupAdmin'
// import LoginAdmin from './components/LoginAdmin'
import Router from './Router'
import axios from 'axios'
import { AuthContextProvider } from './context/AuthContext'
axios.defaults.withCredentials=true; 
function App() {
  
  return (
    <div>
      <AuthContextProvider>
        <Router />
      {/* <Router>
            <Switch>
              <Route path="/" exact component={Navi} />
              <Route path="/login" component={Login} />
              <Route path="/resetpassword" exact component={ResetPass} />
              <Route path="/reset/:token" component={Reset} />
              <Route path="/search" component={Search} />
              <Route path="/notablealumni" component={NotableAlumni} />
              <Route path="/searchBy" component={SearchBy} />
              <Route path="/signup" component={Signup} />
              <Route path="/users" component={User} />
              <Route path="/community" component={Community} />
              <Route path="/dashboard/:id" exact component={Dashboard} />
              <Route path="/update/:id" exact component={Update} />
              <Route path="/updatebyadmin/:id" exact component={UpdateByAdmin} />
              <Route path="/changeProfile/:id" exact component={ChangeProfile} />
              <Route path="/changepassword/:id" exact component={ChangePassword} />
              <Route path="/addnotablealumni" component={SubmitNotable} />
              <Route path="/admin/login" exact component={LoginAdmin} />
              <Route path="/admin/signup" exact component={SignupAdmin} />
            </Switch>  
        </Router> */}
        </AuthContextProvider>
    </div>
  )
}
export default App




