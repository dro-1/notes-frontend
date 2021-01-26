import React, { createContext, ReactNode, useState } from "react";
import { INote } from "../components/notes/note.component";

export const UserContext = createContext({
  username: "",
  notes: [] as Array<INote>,
  setNotes: (notes: React.SetStateAction<INote[]>) => { },
  setToken: (token: React.SetStateAction<string>) => { },
  setUsername: (username: React.SetStateAction<string>) => { },
  token: ''
});

interface Props {
  children: ReactNode
}

const UserProvider: React.FC<Props> = ({ children }) => {

  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')
  const [notes, setNotes] = useState<Array<INote>>([])
  const filterNotes = ({ text }: { text: string }) => {
    const filteredNotes = notes.filter(post => post.title.includes(text))
    setNotes(filteredNotes)
  }

  return (
    <UserContext.Provider value={{
      username,
      notes,
      token,
      setNotes: (notes: React.SetStateAction<INote[]>) => setNotes(notes),
      setToken: (token: React.SetStateAction<string>) => setToken(token),
      setUsername: (username: React.SetStateAction<string>) => setUsername(username)
    }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
