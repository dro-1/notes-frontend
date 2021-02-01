
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import EditNote from './components/edit-note/edit-note.component';

import HomePage from "./components/home/home.component";
import LoginPage from './components/login/login.component';
import ViewNote from './components/notes/view-note.component';
import SignUpPage from "./components/signup/signup.component";



const PrivateRoute = ({ component, render, path }: { component?: any, render?: any, path: string }) => {
  let Component: any;
  if (component) {
    Component = component
  }
  const isSignedIn = !!localStorage.getItem('csrfToken')
  return isSignedIn
    ? render
      ? <Route path={path} render={render} />
      : <Route render={props => <Component {...props} />} />
    : <Redirect
      to='/login' />
}



function App() {
  return <Switch>
    <Route path='/signup' component={SignUpPage} />
    <Route path='/login' component={LoginPage} />

    <PrivateRoute path='/' component={HomePage} />
    <PrivateRoute path='/view' render={(props: any) => <ViewNote {...props.location.state.note} />} />
    <PrivateRoute path='/edit' render={(props: any) => props.location.state && props.location.state.note ? <EditNote componentType='edit' {...props.location.state.note} /> : <EditNote componentType='add' />} />
  </Switch>
}

export default App;
