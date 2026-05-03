import React, { useEffect, useState } from 'react'
import axios from "axios"

export const App = () => {
  const [notes, setnotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDesc, setEditDesc] = useState("")

  function fatchnote(){
    axios.get("http://localhost:3000/notes")
      .then((res)=>{
        console.log(res.data)
        setnotes(res.data.notes) 
      })
      .catch((err) => console.error("Error fetching notes:", err))
  }

  useEffect(()=>{
    fatchnote()
  },[])

  function handlesubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements
    console.log(title, description)

    axios.post("http://localhost:3000/notes", {
      title: title.value,
      description: description.value
    })
      .then((res)=>{
        console.log(res.data)
        fatchnote()
        e.target.reset()
      })
      .catch((err) => console.error("Error creating note:", err))
  }

  function deletenote(noteId){
    axios.delete("http://localhost:3000/notes/" + noteId)
      .then(res=>{
        console.log(res.data)
        fatchnote()
      })
      .catch((err) => console.error("Error deleting note:", err))
  }

  function updatenote(noteId){
    if(!editTitle.trim() || !editDesc.trim()){
      alert("Please fill all fields")
      return
    }

    axios.patch("http://localhost:3000/notes/" + noteId, {
      title: editTitle,
      description: editDesc
    })
      .then(()=>{
        fatchnote()
        setEditingId(null)
        setEditTitle("")
        setEditDesc("")
      })
      .catch((err) => console.error("Error updating note:", err))
  }

  function startEdit(note){
    setEditingId(note._id)
    setEditTitle(note.title)
    setEditDesc(note.description)
  }

  function cancelEdit(){
    setEditingId(null)
    setEditTitle("")
    setEditDesc("")
  }

  return (
    <>
      <form className='note-create-form' onSubmit={handlesubmit}>
        <input type="text" name='title' placeholder='enter the title' required/>
        <input type="text" name='description' placeholder='enter the description' required/>
        <button>create note</button>
      </form>

      <div className="notes">
        {
          notes.map((note) => {
            return (
              <div className="note" key={note._id}>
                {
                  editingId === note._id ? (
                    <>
                      <input 
                        type="text" 
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Edit title"
                      />
                      <textarea 
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        placeholder="Edit description"
                      />
                      <button onClick={() => updatenote(note._id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <h1>{note.title}</h1>
                      <p>{note.description}</p>
                      <button onClick={() => deletenote(note._id)}>Delete</button>
                      <button onClick={() => startEdit(note)}>Update</button>
                    </>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App