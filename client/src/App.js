import React from 'react'
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import User from './components/User'
import Navi from './Navi'
function App() {
  return (
    <div>
       <Router>
            <Switch>
              <Route path="/" exact component={Navi} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/users" component={User} />
              <Route path="/dashboard/:id" exact component={Dashboard} />
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




