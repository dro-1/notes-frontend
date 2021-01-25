import React, { ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdCheckmark } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import './edit-note.scss'
import axios from 'axios';

interface IEditProps { type: 'add' | 'edit', title?: string, content?: string, children?: ReactNode }

const EditNote: React.FC<IEditProps> = (props) => {
    const [title, setTitle] = useState(props.title || '')
    const [content, setContent] = useState(props.content || '')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { goBack, push } = useHistory()
    const submitForm = async () => {
        setLoading(true)
        if (props.type === 'add') {
            const body = {
                query: `
                mutation AddNote($title: String!, $content: String!){
                    addNote(title:$title, content:$content){
                      message
                    }
                  }
                `,
                variables: {
                    title,
                    content
                }
            }
            try {
                const token = localStorage.getItem('token')
                const response = await axios.post('http://localhost:8080/graphql', body, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                console.log(response)
                if (response.data.data.addNote.message === "Note created successfully") {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => push('/home'), 2000)
                }
            } catch (err) {
                setLoading(false)
                setError('Error')
                setTimeout(() => {
                    setError('')
                }, 5000)

                // if (err.response.data.errors[0].status === 401) {
                //     setLoading(false)
                //     setError('Incorrect Login Details')
                //     setTimeout(() => {
                //         setError('')
                //     }, 10000)
                // }
                // if (err.response.data.errors.status === 500) {
                //     setLoading(false)
                //     setError('An error occurred. Please try again')
                //     setTimeout(() => {
                //         setError('')
                //     }, 10000)
                // }
            }
        } else {
            const body = {
                query: `
                query Login($loginId: String!, $password: String! ){
                    login(loginInput:{
                      loginId: $loginId,
                      password: $password
                    }){
                      token
                      message
                      status
                      user{
                          username
                      }
                    }
                  }
                `,
                variables: {
                    title,
                    content
                }
            }
            try {
                const token = localStorage.getItem('token')
                const response = await axios.post('http://localhost:8080/graphql', body, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                if (response.data.data.login.status === 200) {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => push('/home'), 2000)
                }
            } catch (err) {
                setLoading(false)
                setError('Error')
                setTimeout(() => {
                    setError('')
                }, 5000)

                // if (err.response.data.errors[0].status === 401) {
                //     setLoading(false)
                //     setError('Incorrect Login Details')
                //     setTimeout(() => {
                //         setError('')
                //     }, 10000)
                // }
                // if (err.response.data.errors.status === 500) {
                //     setLoading(false)
                //     setError('An error occurred. Please try again')
                //     setTimeout(() => {
                //         setError('')
                //     }, 10000)
                // }
            }

        }
    }
    return (
        <section className='edit'>
            <header>
                <IoMdArrowRoundBack onClick={() => goBack()} />
                <p>Seun</p>
            </header>
            <form>
                <input type='text' value={title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)} />
                <textarea rows={5}
                    placeholder='Content goes here...'
                    onChange={e => setContent(e.target.value)} defaultValue={content}></textarea>
            </form>
            <button onClick={submitForm} disabled={loading || error || success ? true : false} className={`${loading || error || success ? 'loading' : ''}`}>
                {
                    error ? error
                        : success ? 'Saved'
                            : loading
                                ? <AiOutlineLoading3Quarters className='loading' />
                                : <IoMdCheckmark />}
            </button>
        </section>
    )
}

export default EditNote
