import React from 'react'
import { useHistory } from 'react-router-dom'

export interface INote {
    id: string
    title: string
    content: string
    updatedAt: Date
    type: 'none' | 'personal' | 'work' | 'todo'
}

const Note: React.FC<INote> = ({ title, content, updatedAt, type, id }) => {
    const { push } = useHistory()
    return (
        <div className={`${type}`} onClick={() => push('/view', {
            note: {
                title,
                content,
                updatedAt,
                type,
                id
            }
        })}>
            <h2>{title}</h2>
            <em>{updatedAt.toDateString()}</em>
        </div>
    )
}

export default Note