import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'

import { INote } from './note.component'
import './view-note.scss'

const ViewNote: React.FC<INote> = ({ title, updatedAt, content, type }) => {
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
                <Link to='/add'><AiOutlinePlus /></Link>
                <Link to={{
                    pathname: '/edit',
                    state: {
                        note: {
                            title,
                            content
                        }
                    }
                }}><MdModeEdit /></Link>
                <button><BsFillTrashFill /></button>
            </div>
        </section>
    )
}

export default ViewNote