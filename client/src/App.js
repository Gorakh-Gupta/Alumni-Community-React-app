import React from 'react'
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import User from './components/User'
import Update from './components/Update'
import Navi from './Navi'
import ChangeProfile from './components/ChangeProfile'
import Search from './components/Search'
import SearchBy from './components/SearchBy'
import NotableAlumni from './components/NotableAlumni'
import SubmitNotable from './components/SubmitNotable'
function App() {
  return (
    <div>
       <Router>
            <Switch>
              <Route path="/" exact component={Navi} />
              <Route path="/login" component={Login} />
              <Route path="/search" component={Search} />
              <Route path="/notablealumni" component={NotableAlumni} />
              <Route path="/searchBy" component={SearchBy} />
              <Route path="/signup" component={Signup} />
              <Route path="/users" component={User} />
              <Route path="/dashboard/:id" exact component={Dashboard} />
              <Route path="/update/:id" exact component={Update} />
              <Route path="/changeProfile/:id" exact component={ChangeProfile} />
              <Route path="/addnotablealumni" component={SubmitNotable} />
            </Switch>  
        </Router>
    </div>
  )
}
function Home()
{
  return (<h1>HomePage</h1>);
}
export default App




