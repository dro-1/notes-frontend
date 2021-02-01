import React, { ReactNode, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdCheckmark } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import './edit-note.scss'
import axios from './../../api/api';

type NoteTypes = 'none' | 'personal' | 'work' | 'todo'
interface IEditProps {
    type?: NoteTypes
    componentType: 'add' | 'edit',
    title?: string,
    content?: string,
    id?: string,
    children?: ReactNode
}

const EditNote: React.FC<IEditProps> = (props) => {
    const [title, setTitle] = useState(props.title || '')
    const [content, setContent] = useState(props.content || '')
    const [type, setType] = useState<NoteTypes>(props.type || 'none')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const { goBack, push } = useHistory()
    useEffect(() => {
        if (props.id) {
            localStorage.setItem('noteId', props.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const submitForm = async () => {
        setLoading(true)
        if (props.componentType === 'add') {
            const body = {
                query: `
                mutation AddNote($title: String!, $content: String!, $type: String!){
                    addNote(title:$title, content:$content, type:$type){
                      message
                    }
                  }
                `,
                variables: {
                    title,
                    content,
                    type
                }
            }
            try {
                const response = await axios.post('/', body, {
                    withCredentials: true
                })
                console.log(response)
                if (response.data.data.addNote.message === "Note created successfully") {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => push('/'), 2000)
                }
            } catch (err) {
                setLoading(false)
                setError('Error')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }
        } else if (props.componentType === 'edit') {
            const noteId = props.id || localStorage.getItem('noteId')
            const body = {
                query: `
                mutation EditNote($title: String!, $content: String!, $type: String!,  $noteId: String!){
                    editNote(title:$title, content:$content, type:$type, noteId: $noteId){
                      message
                    }
                  }
                `,
                variables: {
                    title,
                    content,
                    noteId,
                    type
                }
            }
            try {
                const response = await axios.post('/', body, {
                    withCredentials: true
                })
                if (response.data.data.editNote.message === "Note updated successfully") {
                    setLoading(false)
                    setSuccess(true)
                    setTimeout(() => push('/'), 2000)
                }
            } catch (err) {
                setLoading(false)
                setError('Error')
                setTimeout(() => {
                    setError('')
                }, 5000)
            }

        }
    }

    const handleTypeClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: NoteTypes) => {
        event.preventDefault()
        setType(type)
    }
    return (
        <section className='edit'>
            <header>
                <IoMdArrowRoundBack onClick={() => goBack()} />
                <h2>{props.componentType === 'add' ? 'Add Note' : 'Edit Note'}</h2>
                <p>Seun</p>
            </header>
            <form>
                <input type='text' value={title}
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)} />
                <div className='buttons'>
                    <button onClick={e => handleTypeClick(e, 'none')} className='none'>Uncategorized{type === 'none' ? <IoMdCheckmark /> : null}</button>
                    <button onClick={e => handleTypeClick(e, 'personal')} className='personal'>Personal{type === 'personal' ? <IoMdCheckmark /> : null}</button>
                    <button onClick={e => handleTypeClick(e, 'work')} className='work'>Work{type === 'work' ? <IoMdCheckmark /> : null}</button>
                    <button onClick={e => handleTypeClick(e, 'todo')} className='todo'>ToDo{type === 'todo' ? <IoMdCheckmark /> : null}</button>
                </div>
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
