import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { IoMdArrowRoundBack, IoMdCheckmark } from 'react-icons/io'
import { MdModeEdit, MdErrorOutline } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineLoading3Quarters } from 'react-icons/ai'

import { INote } from './note.component'
import './view-note.scss'
import axios from './../../api/api';

const ViewNote: React.FC<INote> = ({ title, updatedAt, content, id, type }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const { push } = useHistory()

    const submitForm = async () => {
        setError(false)
        setLoading(true)
        const body = {
            query: `
                mutation DeleteNote($noteId: String!){
                    deleteNote(noteId:$noteId){
                      message
                    }
                  }
                `,
            variables: {
                noteId: id
            }
        }
        try {
            const response = await axios.post('/', body, {
                withCredentials: true
            })
            console.log(response)
            if (response.data.errors) {
                throw new Error()
            } else if (response.data.data.deleteNote.message === "Note Successfully Deleted") {
                setLoading(false)
                setSuccess(true)
                setTimeout(() => push('/home'), 2000)
            }
        } catch (err) {
            setLoading(false)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        }
    }

    return (
        <section className='view'>
            <header>
                <Link to='/home'><IoMdArrowRoundBack /></Link>
                <p>Seun</p>
            </header>
            <h2>{title}</h2>
            <em>{updatedAt.toDateString()}</em>
            <p>{content}</p>
            <div className='buttons'>
                <Link to='/edit'><AiOutlinePlus /></Link>
                <Link to={{
                    pathname: '/edit',
                    state: {
                        note: {
                            title,
                            content,
                            id,
                            type
                        }
                    }
                }}><MdModeEdit /></Link>
                <button onClick={submitForm} disabled={loading || error || success ? true : false} className={`${loading || error || success ? 'loading' : ''}`}>
                    {
                        error ? <MdErrorOutline className='error' />
                            : success ? <IoMdCheckmark className='success' />
                                : loading
                                    ? <AiOutlineLoading3Quarters className='loading view' />
                                    : <BsFillTrashFill />
                    }
                </button>
            </div>
        </section>
    )
}

export default ViewNote