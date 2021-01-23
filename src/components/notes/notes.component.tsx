import React, { useState } from 'react';

import './notes.scss'
import Note, { INote } from './note.component'

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Array<INote>>([])
    return (
        <section className='notes'>
            <Note
                title='Na me Run am for thee movie wey dem drop yesterday '
                content='I just made it now'
                type='none'
                updatedAt={new Date()}
            />
            <Note
                title='Na me Run am'
                content='I just made it now'
                type='personal'
                updatedAt={new Date()}
            />
            <Note
                title="I'm telling you, I made it all by myself"
                content='I just made it now'
                type='todo'
                updatedAt={new Date()}
            />
            <Note
                title='Just comot for my front this guy'
                content='I just made it now'
                type='work'
                updatedAt={new Date()}
            />
        </section>
    )
}

export default Notes