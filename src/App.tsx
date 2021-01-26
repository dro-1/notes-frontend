
import { Switch, Route } from 'react-router-dom'
import EditNote from './components/edit-note/edit-note.component';

import HomePage from "./components/home/home.component";
import LoginPage from './components/login/login.component';
import ViewNote from './components/notes/view-note.component';
import SignUpPage from "./components/signup/signup.component";

function App() {
  return <Switch>
    <Route path='/signup' component={SignUpPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/home' component={HomePage} />
    <Route path='/view' render={(props: any) => <ViewNote {...props.location.state.note} />} />
    <Route path='/edit' render={(props: any) => props.location.state && props.location.state.note ? <EditNote componentType='edit' {...props.location.state.note} /> : <EditNote componentType='add' />} />
  </Switch>
}

export default App;
