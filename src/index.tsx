import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/user.provider'
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
=======
>>>>>>> 1336b3c22f0e4f8cf47e88b94afc1ea5a0d6df47
//import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>,
  document.getElementById("root"),
);

<<<<<<< HEAD
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

=======
>>>>>>> 1336b3c22f0e4f8cf47e88b94afc1ea5a0d6df47
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
