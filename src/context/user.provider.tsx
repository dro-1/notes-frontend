import React, { createContext, ReactNode, useState } from "react";
import { INote } from "../components/notes/note.component";

export const UserContext = createContext({
  username: "",
  notes: [] as Array<INote>,
  setNotes: (notes: React.SetStateAction<INote[]>) => { },
  setUsername: (username: React.SetStateAction<string>) => { },
  setSearchText: (text: React.SetStateAction<string>) => { },
});

interface Props {
  children: ReactNode
}

const UserProvider: React.FC<Props> = ({ children }) => {

  const [username, setUsername] = useState('')
  const [notes, setNotes] = useState<Array<INote>>([])
  const [searchText, setSearchText] = useState('')

  return (
    <UserContext.Provider value={{
      username,
      notes: notes.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase())),
      setNotes: (notes: React.SetStateAction<INote[]>) => setNotes(notes),
      setUsername: (username: React.SetStateAction<string>) => setUsername(username),
      setSearchText: (text: React.SetStateAction<string>) => setSearchText(text),
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
