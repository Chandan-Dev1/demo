import React, { useEffect, useState } from 'react'
import axios from "axios"

export const App = () => {
  const [notes, setnotes] = useState([
])

function fatchnote(){
     axios.get("http://localhost:3000/notes")
    .then((res)=>{
      console.log(res.data)
       setnotes(res.data.notes) 
    })
}

useEffect(()=>{
 fatchnote()
},[])

function handlesubmit(e){
  e.preventDefault()

  const {title,description}=e.target.elements
  console.log(title,description)

  axios.post("http://localhost:3000/notes",{
    title:title.value,
    description:description.value
  })
  .then((res)=>{
    console.log(res.data)
      fatchnote()
  })


}

function deletenote(note){
  axios.delete("http://localhost:3000/notes/"+note)
    .then(res=>{
      console.log(res.data)
      fatchnote()
    })

}

function updatenote(note){
  axios.patch("http://localhost:3000/notes/" + note._id, {
    title: note.title,
    description: note.description
  })
  .then(()=>{
    fatchnote()
  })
}
  return (
     <>
     <form className='note-create-form' onSubmit={handlesubmit}>
      <input type="text" name='title' placeholder='enter the title'/>
      <input type="text" name='description' placeholder='enter the description' />
      <button>create note</button>
     </form>
    <div className="notes">
      {
        notes.map((note, index) => {
          return (
            <div className="note" key={index}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{deletenote(note._id)}}>delete</button>
              <button onClick={()=>{updatenote(note._id)}}>update</button>
            </div>
          )
        })
      }
    </div>
   </>
  )
}

export default App
