import React from 'react';
import SignUpSVG from './../../assets/signup.svg'
import Form from '../form/form.component';
import './signup.scss'
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    return (
        <main className='signup'>
            <h1>Sign Up</h1>
            <img src={SignUpSVG} alt='Sign In' />
            <Form type='signup' />
            <em>Already have an account? <Link to='/login'>Sign In</Link></em>
        </main>
    )
}

export default SignUpPage