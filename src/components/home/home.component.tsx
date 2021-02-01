<<<<<<< HEAD
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
=======
import React, { useState } from 'react'
import './home.scss'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

import Notes from '../notes/notes.component'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
    const [search, setSearch] = useState('')
    const [isSearchboxOpen, setSearchBoxOpen] = useState(false)
>>>>>>> 1336b3c22f0e4f8cf47e88b94afc1ea5a0d6df47
    return (
        <section className='home'>
            <header>
                <h1>Notes</h1>
                <BiSearch onClick={e => setSearchBoxOpen(!isSearchboxOpen)} />
            </header>
<<<<<<< HEAD
            <input className={`${isSearchboxOpen ? 'active' : ''}`} placeholder='Search' type='text' onChange={e => setSearchText(e.target.value)} />
            <main>
                <Notes />
            </main>
            <div className='buttons'>
                <Link to='/edit'><AiOutlinePlus /></Link>
                <button onClick={logOut}><GiExitDoor /></button>
            </div>
=======
            <input className={`${isSearchboxOpen ? 'active' : ''}`} placeholder='Search' type='text' onChange={e => setSearch(e.target.value)} />
            <main>
                <Notes />
            </main>
            <Link to='/edit'><AiOutlinePlus /></Link>
>>>>>>> 1336b3c22f0e4f8cf47e88b94afc1ea5a0d6df47
        </section>
    )
}

export default HomePage