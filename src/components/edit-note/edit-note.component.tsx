import React, { ReactNode, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoMdArrowRoundBack, IoMdCheckmark } from 'react-icons/io'

import './edit-note.scss'

interface IEditProps { title: string, content: string, children?: ReactNode }

const EditNote: React.FC<IEditProps> = (props) => {
    const [title, setTitle] = useState(props.title || '')
    const [content, setContent] = useState(props.content || '')
    const { goBack } = useHistory()
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
                    onChange={e => setContent(e.target.value)}>{content}</textarea>
            </form>
            <Link to='/home'><IoMdCheckmark /></Link>
        </section>
    )
}

export default EditNote
