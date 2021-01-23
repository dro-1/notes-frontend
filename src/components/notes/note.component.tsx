import React from 'react'

export interface INote {
    title: string
    content: string
    updatedAt: Date
    type: 'none' | 'personal' | 'work' | 'todo'
}

const Note: React.FC<INote> = ({ title, content, updatedAt, type }) => {
    return (
        <div className={`${type}`}>
            <h2>{title}</h2>
            <em>{updatedAt.toDateString()}</em>
        </div>
    )
}

export default Note