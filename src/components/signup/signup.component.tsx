import React from 'react';
import SignUpSVG from './../../assets/signup.svg'
import Form from '../form/form.component';
import './signup.scss'
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
    return (
        <main className='signup'>
            <h1>Sign Up</h1>
            <div className='main'>
                <img id='signUp' src={SignUpSVG} alt='Sign In' />
                <Form type='signup' />
            </div>
            <em>Already have an account? <Link to='/login'>Sign In</Link></em>
        </main>
    )
}

export default SignUpPage