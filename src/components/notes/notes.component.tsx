import React, { useState } from 'react';
import './notes.scss'

interface Note {
    title: string
    content: string
    updatedAt: Date
    type: 'none' | 'personal' | 'work' | 'todo'
}

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Array<Note>>([])
    return (
        <section className='notes'>
            <div>
                <h2>My first post</h2>
                <em>23 January, 2021</em>
            </div>
            <div>
                <h2>My first post</h2>
                <em>23 January, 2021</em>
            </div>
            <div>
                <h2>My first post</h2>
                <em>23 January, 2021</em>
            </div>
            <div>
                <h2>My first post</h2>
                <em>23 January, 2021</em>
            </div>
            <div>
                <h2>My first post</h2>
                <em>23 January, 2021</em>
            </div>
        </section>
    )
}

export default Notes