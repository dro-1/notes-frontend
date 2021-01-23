import React, { useState } from 'react'
import './home.scss'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

import Notes from '../notes/notes.component'

const HomePage: React.FC = () => {
    const [search, setSearch] = useState('')
    const [isSearchboxOpen, setSearchBoxOpen] = useState(false)
    return (
        <section className='home'>
            <header>
                <h1>Notes</h1>
                <BiSearch onClick={e => setSearchBoxOpen(!isSearchboxOpen)} />
            </header>
            <input className={`${isSearchboxOpen ? 'active' : ''}`} placeholder='Search' type='text' onChange={e => setSearch(e.target.value)} />
            <main>
                <Notes />
            </main>
            <button><AiOutlinePlus /></button>
        </section>
    )
}

export default HomePage