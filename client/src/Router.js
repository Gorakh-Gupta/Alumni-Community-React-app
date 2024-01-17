import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import ChangePassword from './components/ChangePassword'
import Community from './components/Community'
import Reset from './components/Reset'
import ResetPass from './components/ResetPass'
import UpdateByAdmin from './components/UpdateByAdmin'
import SignupAdmin from './components/SignupAdmin'
import LoginAdmin from './components/LoginAdmin'
import AuthContext from './context/AuthContext'
import SendMessage from './components/SendMessage'
import AdminDashboard from './components/AdminDashboard'
import LoginOTP from './components/LoginOTP'
import Post from './components/Post'
import FAQ from './components/FAQ'
import UploadNotice from './components/UploadNotice'
import AnswerFaq from './components/AnswerFaq'
import SinglePost from './components/SinglePost'
function RouterPath() {
  const { loggedUser, loggedAdmin } = useContext(AuthContext);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/admin/login" exact component={LoginAdmin} />
          <Route path="/admin/signup" exact component={SignupAdmin} />
          <Route path="/admin/loginOTP" exact component={LoginOTP} />
          <Route path="/" exact component={Navi} />
          <Route path="/reset/:token" component={Reset} />
          <Route path="/login" component={Login} />
          <Route path="/notablealumni" component={NotableAlumni} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetpassword" exact component={ResetPass} />

          {
            loggedUser === true && <>
              <Route path="/search" component={Search} />
              <Route path="/users" component={User} />
              <Route path="/community" component={Community} />
              <Route path="/dashboard/:id" exact component={Dashboard} />
              <Route path="/update/:id" exact component={Update} />
              <Route path="/changeProfile/:id" exact component={ChangeProfile} />
              <Route path="/changepassword/:id" exact component={ChangePassword} />
              <Route path="/" exact component={Navi} />
              <Route path="/login" component={Login} />
              <Route path="/notablealumni" component={NotableAlumni} />
              <Route path="/signup" component={Signup} />
              <Route path="/post/:id" component={SinglePost} />
              <Route path="/faq" component={FAQ} />
            </>
          }
          {
            loggedAdmin == true && <>
              <Route path="/addnotablealumni" component={SubmitNotable} />
              <Route path="/searchBy" component={SearchBy} />
              <Route path="/sendmessage" component={SendMessage} />
              <Route path="/admindashboard" component={AdminDashboard} />
              <Route path="/updatebyadmin/:id" exact component={UpdateByAdmin} />
              <Route path="/uploadnotice" component={UploadNotice} />
              <Route path="/answerfaq" component={AnswerFaq} />
            </>
          }
        </Switch>
      </Router>
    </div>
  )
}

export default RouterPath
