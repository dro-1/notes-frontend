
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import EditNote from './components/edit-note/edit-note.component';

import HomePage from "./components/home/home.component";
import LoginPage from './components/login/login.component';
import ViewNote from './components/notes/view-note.component';
import SignUpPage from "./components/signup/signup.component";



const PrivateRoute = ({ component, render, path, exact }: { component?: any, render?: any, path: string, exact?: boolean }) => {
  let Component: any;
  if (component) {
    Component = component
  }
  const isSignedIn = !!localStorage.getItem('csrfToken')
  return isSignedIn
    ? render
      ? <Route exact={exact} path={path} render={render} />
      : <Route exact={exact} path={path} render={props => <Component {...props} />} />
    : <Redirect
      to='/login' />
}

const PublicRoute = ({ component, path }: { component: any, path: string }) => {
  const isSignedIn = !!localStorage.getItem('csrfToken')
  return isSignedIn
    ? <Redirect
      to='/' />
    : <Route path={path} component={component} />
}



function App() {
  return <Switch>
    <PublicRoute path='/signup' component={SignUpPage} />
    <PublicRoute path='/login' component={LoginPage} />

    <PrivateRoute exact path='/' component={HomePage} />
    <PrivateRoute path='/view' render={(props: any) => <ViewNote {...props.location.state.note} />} />
    <PrivateRoute path='/edit' render={(props: any) => props.location.state && props.location.state.note ? <EditNote componentType='edit' {...props.location.state.note} /> : <EditNote componentType='add' />} />
  </Switch>
}

export default App;
