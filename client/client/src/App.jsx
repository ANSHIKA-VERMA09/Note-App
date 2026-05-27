import { useEffect, useState } from "react"
import axios from "axios";
import NoteList from "./components/Notelist";
import "./App.css";




function App() {
  const [notes, setNotes] = useState([]);
  const[title,setTitle]=useState("");
  const[content,setContent]=useState("");
  const [editingID, setEditingID] = useState(null);
  


  useEffect(() => {
    fetchNotes();
  }, []);


  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes/");
      setNotes(response.data);
    }
    catch (error) {
      console.log("Error while fetching notes", error);
    }
  };

  const addNote=async()=>{
    try{
      await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content
        }
      );
      fetchNotes();

      setTitle("");
      setContent("");
    }
    catch(error){
      console.log(error);
    }
  };

  const deleteNote=async(id)=>{
    try{
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  
   }
  catch(error){
    console.log(error);
  }

};
const handleEdit = (note) => {

  setTitle(note.title);
  setContent(note.content);

  setEditingID(note.id);
};

  


  return (
    <>
     
      {/* <NoteList notes={notes} /> */}

      <div className="app">
        <h1 className="title">Notes App</h1>
        <div className="container">
          <h2 className="form">Add Note</h2>

          <input
          className="input"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            onKeyDown={e=> e.key==="Enter" && addNote}

            
          />

          <textarea
             className="textarea"
            placeholder="Enter content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            
          ></textarea>

          <button onClick={addNote} className="add-btn">
  {editingID ? "Update Note" : "Add Note"}
</button>

        </div>

       <div className="notes-container">

     
       {
        notes.map((note)=>(
          <div className="note-card" key={note.id}>

          <h3 className="">{note.title}</h3>
          <p className="">{note.content}</p>

         <div >

  <button onClick={()=>handleEdit(note)} className="edit-btn">
    Edit
  </button>

  <button onClick={()=>deleteNote(note.id)} className="delete-btn">
    Delete
  </button>

</div>

          </div>
        ))}


      </div>
      </div>
    </>
  );
}

export default App
