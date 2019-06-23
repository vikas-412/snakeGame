import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppBar from './AppBar';
import Login from './pages/Login';
import Comp from './pages/Comp';
import SignUp from './pages/Signup';
import PlayGround from './pages/PlayGround'
import { getToken } from './services/auth' 

const Routes = props => {
  return (
    <div>
      <AppBar auth={false} />
      <Route exact path="/" render={()=><Redirect to="/login"/>}  />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/xyz" render={() => <Comp name="Dev" />} />
      <Route path="/play" render={()=><PrivateRoute render={()=><PlayGround />}> </PrivateRoute>} />
      <Route render={()=><Redirect to="/"/>} />
      
    </div>
  );
};

const PrivateRoute = (props) =>{
  if(getToken()){
    return props.render();
  }
  return <Redirect to='/login'/>
}

export default Routes;
