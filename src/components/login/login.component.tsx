import React from 'react';
import SignInSVG from './../../assets/signin.svg'
import Form from '../form/form.component';
import './login.scss'
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    return (
        <main className='login'>
            <h1>Sign In</h1>
            <img src={SignInSVG} alt='Sign In' />
            <Form type='signin' />
            <em>Don't have an account? <Link to='/signup'>Sign Up</Link></em>
        </main>
    )
}

export default LoginPage