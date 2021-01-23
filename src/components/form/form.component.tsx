import React, { useState } from 'react'
import { BsForwardFill } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './form.scss'

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

    const handleClickToName = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event?.preventDefault()
        setActivateName(true)
    }
    const handleClickToPassword = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event?.preventDefault()
        setActivatePassword(true)
    }

    return (
        <form>
            {
                type === 'signin'
                    ? loading
                        ? <AiOutlineLoading3Quarters className='loading' />
                        : <>
                            <div className='form-group'>
                                <input onChange={(e) => setUser(e.target.value)} onFocus={() => setActivatePassword(false)} type='text' name='user' id='user' placeholder='Username/Email' />
                                {!activatePassword ? <BsForwardFill onClick={handleClickToPassword} /> : null}

                            </div>
                            <div className={`form-group ${activatePassword ? 'active' : ''}`}>
                                <input onChange={(e) => setPassword(e.target.value)} type='text' name='password' id='password' placeholder='Password' />
                                <BsForwardFill onClick={() => setLoading(true)} />
                            </div>
                        </>
                    : loading
                        ? <AiOutlineLoading3Quarters className='loading' />
                        : <>
                            <div className='form-group'>
                                <input onChange={(e) => setUser(e.target.value)} onFocus={() => { setActivateName(false); setActivatePassword(false) }} type='email' name='email' id='email' placeholder='Email' />
                                {!activateName ? <BsForwardFill onClick={handleClickToName} /> : null}

                            </div>
                            <div className={`form-group ${activateName ? 'active' : ''}`}>
                                <input onChange={(e) => setName(e.target.value)} onFocus={() => setActivatePassword(false)} type='text' name='username' id='username' placeholder='Username' />
                                {!activatePassword ? <BsForwardFill onClick={handleClickToPassword} /> : null}

                            </div>
                            <div className={`form-group ${activatePassword ? 'active' : ''}`}>
                                <input onChange={(e) => setPassword(e.target.value)} type='text' name='password' id='password' placeholder='Password' />
                                <BsForwardFill onClick={() => setLoading(true)} />
                            </div>
                        </>
            }

        </form>
    )
}

export default Form