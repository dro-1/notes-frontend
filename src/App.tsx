
import { Switch, Route } from 'react-router-dom'

import HomePage from "./components/home/home.component";
import LoginPage from './components/login/login.component';
import SignUpPage from "./components/signup/signup.component";


function App() {
  return <Switch>
    <Route path='/signup' component={SignUpPage} />
    <Route path='/login' component={LoginPage} />
    <Route path='/home' component={HomePage} />
  </Switch>
}

export default App;
