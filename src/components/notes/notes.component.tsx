import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { IoIosRefresh } from 'react-icons/io'

import './notes.scss'
import Note from './note.component'
import { UserContext } from './../../context/user.provider'
import axios from './../../api/api';

const Notes: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { notes, setNotes } = useContext(UserContext)

    const getNotes = async () => {
        setError(false)
        setLoading(true)
        const body = {
            query: `
            query{
                getNotes{
                  notes{
                      id
                      title
                      content
                      updatedAt
                      type
                  }
                  status
                }
              }
            `,
        }
        try {

            const response = await axios.post('/', body, {
                withCredentials: true
            })

            const { notes, status } = response.data.data.getNotes
            if (response.data.errors) {
                throw new Error()
            } else if (status === 200) {
                setLoading(false)
                setNotes(notes)
            }
        } catch (err) {
            setLoading(false)
            setError(true)
        }
    }
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (


        loading
            ? <AiOutlineLoading3Quarters className='loading notes' />
            : error ? <div className='error'>
                <p>An error ocurred. Please try again</p>
                <button onClick={() => getNotes()}><IoIosRefresh /></button>
            </div>
                : notes.length > 0
                    ? <section className='notes'>
                        {notes.map((note, index) => <Note
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            type={note.type}
                            key={index}
                            updatedAt={new Date(Number(note.updatedAt))}
                        />)}
                    </section >
                    : null

    )
}

export default Notes