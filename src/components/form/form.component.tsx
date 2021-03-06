import React, { useState } from 'react'
import { BsForwardFill } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoMdCheckmark } from 'react-icons/io'
import { useHistory } from 'react-router-dom'
import './form.scss'
import axios from 'axios'
import customAxios from './../../api/api'
interface Props {
    type: 'signin' | 'signup'
}

const Form: React.FC<Props> = ({ type }) => {
    const [activatePassword, setActivatePassword] = useState(false)
    const [activateName, setActivateName] = useState(false)
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { push } = useHistory()

    const submitForm = async () => {
        setLoading(true)
        if (type === 'signup') {
            const body = {
                query: `
                mutation CreateUser($username: String!,$email: String!, $password: String!){
                    createUser(userInput:{
                      username: $username,
                      email: $email,
                      password: $password
                    }){
                      message
                      status
                    }
                  }
                `,
                variables: {
                    username: name,
                    email: user,
                    password
                }
            }
            try {
                const response = await customAxios.post('/', body)
                console.log(response)
                if (response.data.data.createUser.status === 201) {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => push('/login'), 2000)
                }
            } catch (err) {

                if (err.response.data.errors.status === 422) {
                    setLoading(false)
                    setError('Invalid Input Entered')
                    setTimeout(() => {
                        setError('')
                    }, 10000)
                }
                if (err.response.data.errors.status === 500) {
                    setLoading(false)
                    setError('An error occurred. Please try again')
                    setTimeout(() => {
                        setError('')
                    }, 10000)
                }
            }
        } else {
            const body = {
                loginId: user,
                password
            }

            try {
                const response = await axios.post('https://dro-notes-api.herokuapp.com/login', body, {
                    withCredentials: true
                })
                if (response.status === 200) {
                    setLoading(false)
                    setSuccess(true)
                    localStorage.setItem('csrfToken', response.data.csrfToken)
                    localStorage.setItem('csrfRefreshToken', response.data.csrfRefreshToken)
                    setTimeout(() => push('/home'), 2000)
                }
            } catch (err) {
                if (err.response?.status === 422) {
                    setLoading(false)
                    setError('Incorrect Login Details')
                    setTimeout(() => {
                        setError('')
                    }, 10000)
                } else {
                    setLoading(false)
                    setError('An error occurred. Please try again')
                    setTimeout(() => {
                        setError('')
                    }, 10000)
                }
            }

        }
    }

    const handleClickToName = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event?.preventDefault()
        setActivateName(true)
        const usernameInput: any = document.querySelector('#username')
        usernameInput.focus()
    }
    const handleClickToPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event?.preventDefault()
        setActivatePassword(true)
        const passwordInput: any = document.querySelector('#password')
        passwordInput.focus()
    }

    return (
        <form>
            {
                success
                    ? <IoMdCheckmark className='success' />
                    : type === 'signin'
                        ? loading
                            ? <AiOutlineLoading3Quarters className='loading' />
                            : <>
                                <div className='form-group'>
                                    <input onChange={(e) => setUser(e.target.value)} onFocus={() => setActivatePassword(false)} type='text' name='user' id='user' placeholder='Username/Email' />
                                    {!activatePassword ? <button onClick={handleClickToPassword}><BsForwardFill /></button> : null}
                                </div>
                                <div className={`form-group ${activatePassword ? 'active' : ''}`}>
                                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password' placeholder='Password' />
                                    <button onClick={() => submitForm()} ><BsForwardFill /></button>
                                </div>
                                { error ? <em>{error}</em> : null}
                            </>
                        : loading
                            ? <AiOutlineLoading3Quarters className='loading' />
                            : <>
                                <div className='form-group'>
                                    <input onChange={(e) => setUser(e.target.value)} onFocus={() => { setActivateName(false); setActivatePassword(false) }} type='email' name='email' id='email' placeholder='Email' />
                                    {!activateName ? <button onClick={handleClickToName}><BsForwardFill /></button> : null}
                                </div>
                                <div className={`form-group ${activateName ? 'active' : ''}`}>
                                    <input onChange={(e) => setName(e.target.value)} onFocus={() => setActivatePassword(false)} type='text' name='username' id='username' placeholder='Username' />
                                    {!activatePassword ? <button onClick={handleClickToPassword}><BsForwardFill /></button> : null}
                                </div>
                                <div className={`form-group ${activatePassword ? 'active' : ''}`}>
                                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password' placeholder='Password' />
                                    <button onClick={() => submitForm()} ><BsForwardFill /> </button>
                                </div>
                                { error ? <em>{error}</em> : null}
                            </>
            }

        </form>
    )
}

export default Form