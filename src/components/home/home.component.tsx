import React, { useContext, useState } from 'react'
import './home.scss'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { GiExitDoor } from 'react-icons/gi'

import Notes from '../notes/notes.component'
import { UserContext } from './../../context/user.provider'
import { Link, useHistory } from 'react-router-dom'

const HomePage: React.FC = () => {
    const { setSearchText } = useContext(UserContext)
    const [isSearchboxOpen, setSearchBoxOpen] = useState(false)
    const { push } = useHistory()
    const logOut = () => {
        localStorage.clear()
        push('/login')
    }
    return (
        <section className='home'>
            <header>
                <h1>Notes</h1>
                <BiSearch onClick={e => setSearchBoxOpen(!isSearchboxOpen)} />
            </header>
            <input className={`${isSearchboxOpen ? 'active' : ''}`} placeholder='Search' type='text' onChange={e => setSearchText(e.target.value)} />
            <main>
                <Notes />
            </main>
            <div className='buttons'>
                <Link to='/edit'><AiOutlinePlus /></Link>
                <button onClick={logOut}><GiExitDoor /></button>
            </div>
        </section>
    )
}

export default HomePage